import mongoose from "mongoose";
import jwt from "jsonwebtoken";

interface User {
    id: mongoose.Types.ObjectId;
    email: string;
    role: string;
}

export const generateRefreshToken = (user: User) => {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET || "", {
        expiresIn: "7d",
    });
};

export const generateAccessToken = (user: User) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || "", {
        expiresIn: "15m",
    });
};

export const verifyToken = (token: string, secretKey: string) => {
    return jwt.verify(token, secretKey);
};

export const generateToken = (
    userId: mongoose.Types.ObjectId,
    expiresIn: any
) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn,
    });
};

export const generatePasswordResetLink = (userId: mongoose.Types.ObjectId) => {
    return `${process.env.CLIENT_URL}/auth/password-reset?token=${generateToken(
        userId,
        "30m"
    )}`;
};

export const generateVerificationLink = (userId: mongoose.Types.ObjectId) => {
    return `${process.env.CLIENT_URL}/auth/verify-email?token=${generateToken(
        userId,
        "30m"
    )}`;
};

export const generateReferralLink = (userId: mongoose.Types.ObjectId) => {
    return `${process.env.CLIENT_URL}/auth/register?ref=${generateToken(
        userId,
        "1d"
    )}`;
};
