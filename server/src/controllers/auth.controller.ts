import bcrypt from "bcrypt";
import {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ConflictError,
    InternalServerError,
} from "../utils/errors";
import asyncHandler from "express-async-handler";
import { registrationSchema } from "../middlewares/validations/auth/auth.registration.validations";
import userModel from "../models/user.model";
import { logData, logError } from "../utils/logger";
import {
    generateAccessToken,
    generatePasswordResetLink,
    generateRefreshToken,
    generateToken,
    verifyToken,
    generateReferralLink,
    generateVerificationToken,
} from "../utils/jwtUtils";
import { z } from "zod";
import { emailService } from "..";
import jwt from "jsonwebtoken";
import { Request, Response } from "../utils/Types";
import walletModel from "../models/wallet.model";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    try {
        registrationSchema.parse(data);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        } else {
            return logError(res, error);
        }
    }
    // Check for existing email
    const filterByEmail = await userModel.findOne({ email: data.email });
    if (filterByEmail) {
        return logError(
            res,
            new ConflictError(
                "An account already exists with this email address"
            )
        );
    }

    // Check for existing username
    const filterByUsername = await userModel.findOne({
        username: data.username,
    });
    if (filterByUsername) {
        return logError(
            res,
            new ConflictError("An account already exists with this username")
        );
    }

    // Check for existing phone number
    const filterByPhoneNumber = await userModel.findOne({
        phoneNumber: data.phoneNumber,
    });
    if (filterByPhoneNumber) {
        return logError(
            res,
            new ConflictError(
                "An account already exists with this phone number"
            )
        );
    }

    // Referral logic
    let referrerUser = null;
    if (data.referralToken) {
        try {
            referrerUser = await userModel.findOne({
                referralCode: data.referralToken,
            });
            if (!referrerUser) {
                return logError(
                    res,
                    new ConflictError("Invalid referral token")
                );
            }
        } catch (error) {
            console.log(error);
            return logError(res, new ConflictError("Invalid referral token"));
        }
    }

    // Create user
    const user = await userModel.create({ ...data });

    // Update the referrer's referral list if a referrer exists
    if (referrerUser) {
        referrerUser.referrals = referrerUser.referrals;
        referrerUser.referrals?.push({
            userId: user._id,
            username: user.username,
            email: user.email,
        });
        await referrerUser.save();
        user.referredBy = referrerUser._id;
        await user.save();
    }

    // Create wallet for the user
    const wallet = await walletModel.create({
        user: {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    });

    // Save the token in the user's record
    const verificationtoken = generateVerificationToken();
    user.emailVerificationToken = verificationtoken;
    await user.save();

    await emailService.sendRegistrationConfirmation(user, verificationtoken);

    // Generate tokens
    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role!,
        isVerified: user.isVerified,
    });

    const refreshToken = generateRefreshToken({
        id: user?._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
    });

    // Update user last login and refresh token
    user.lastLogin = new Date().toUTCString();
    user.refreshToken = refreshToken;
    user.referralLink = await generateReferralLink(user._id);
    await user.save();

    // Set session
    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return logData(res, 201, {
        message: "Registration successful",
        user,
        accessToken,
        wallet,
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    const foundUser = await userModel.findOne({
        $or: [
            { email: data.emailOrUsername },
            { username: data.emailOrUsername },
        ],
    });
    if (!foundUser)
        return logError(res, new NotFoundError("Account not found"));

    if (!(await bcrypt.compare(data.password, foundUser?.password)))
        return logError(res, new NotFoundError("Account not found"));

    await emailService.sendLoginNotification(foundUser);

    const accessToken = generateAccessToken({
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role!,
        isVerified: foundUser.isVerified,
    });

    const refreshToken = generateRefreshToken({
        id: foundUser?._id,
        email: foundUser.email,
        role: foundUser.role,
        isVerified: foundUser.isVerified,
    });
    foundUser.lastLogin = new Date().toUTCString(); // Returns the full date in a readable UTC format (e.g., "Mon, 23 Sep 2024 12:34:56 GMT")
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    if (!foundUser.isVerified) {
        const verificationtoken = generateVerificationToken();
        foundUser.emailVerificationToken = verificationtoken;
        await foundUser.save();

        await emailService.sendRegistrationConfirmation(
            foundUser,
            verificationtoken
        );
    }

    req.session.user = {
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
    };

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return logData(res, 200, {
        accessToken,
        role: foundUser.role,
        isVerified: foundUser.isVerified,
    });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    const user = await userModel.findOne({
        refreshToken: cookies.jwt,
    });

    if (!user) return logError(res, new UnauthorizedError("Not logged in"));

    user.refreshToken = null;
    await user?.save();

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: true,
        secure: true,
    });

    return logData(res, 200, { message: "Logged out" });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err: any, decoded: any) => {
            if (err)
                return logError(
                    res,
                    new InternalServerError("Internal Server Error")
                );

            console.log(decoded);

            const user = await userModel.findOne({
                email: decoded.user.email,
            });

            if (!user)
                return logError(res, new UnauthorizedError("Not logged in"));

            const accessToken = generateAccessToken({
                ...user,
                id: user._id,
                role: user.role!,
                isVerified: user.isVerified,
            });

            logData(res, 201, { accessToken });
        }
    );
});

export const forgotPassword = asyncHandler(
    async (req: Request, res: Response) => {
        const data = req.body;

        const foundUser = await userModel.findOne({
            $or: [
                {
                    email: data.emailOrUsername,
                },
                { username: data.emailOrUsername },
            ],
        });

        if (!foundUser)
            return logError(res, new NotFoundError(`Account not found`));

        foundUser.passwordResetToken = generatePasswordResetLink(foundUser._id);

        const passwordResetLink = generatePasswordResetLink(foundUser._id);

        await emailService.sendPasswordResetRequest(
            foundUser,
            passwordResetLink
        );

        return logData(res, 200, {
            message: "Password reset token sent to the email address",
            passwordResetLink,
        });
    }
);

export const resetPassword = asyncHandler(
    async (req: Request, res: Response) => {
        const { password } = req.body;
        const token = req.params.token;

        const decoded = verifyToken(token, process.env.JWT_SECRET!);
        if (!decoded)
            return logError(
                res,
                new BadRequestError("Invalid password reset link")
            );

        const user = await userModel.findOne({
            passwordResetToken: token,
        });
        if (!user) return logError(res, new NotFoundError("User not found!"));

        user.password = password;
        user.passwordResetToken = null;

        await user?.save();

        return logData(res, 200, { message: "Password reset successful" });
    }
);

export const adminRegister = asyncHandler(
    async (req: Request, res: Response) => {
        const data = req.body;

        // Check for existing email
        const filterByEmail = await userModel.findOne({ email: data.email });
        if (filterByEmail) {
            return logError(
                res,
                new ConflictError(
                    "An account already exists with this email address"
                )
            );
        }

        // Create admin
        const admin = await userModel.create({
            ...data,
            role: "admin",
            phoneNumber: "nil",
            username: "nil",
            isVerified: true,
        });

        // Generate tokens
        const accessToken = generateAccessToken({
            id: admin.id,
            email: admin.email,
            role: admin.role!,
            isVerified: admin.isVerified,
        });
        const refreshToken = generateRefreshToken({
            id: admin?._id,
            email: admin.email,
            role: admin.role,
            isVerified: admin.isVerified,
        });

        // Update admin last login and refresh token
        admin.lastLogin = new Date().toUTCString();
        admin.refreshToken = refreshToken;
        await admin.save();

        // Set session
        req.session.admin = {
            id: admin._id,
            email: admin.email,
            role: admin.role,
        };

        // Set cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Respond with success message
        return logData(res, 201, {
            message: "Registration successful",
            admin,
            accessToken,
        });
    }
);

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    const user = await userModel.findOne({ emailVerificationToken: token });
    if (!user) return logError(res, new BadRequestError("Invalid Token!"));

    if (user.isVerified) {
        return logError(res, new ConflictError("Email already verified"));
    }

    user.isVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    return logData(res, 200, { message: "Email verified successfully" });
});
