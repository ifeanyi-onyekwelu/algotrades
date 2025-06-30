import userModel from "../models/user.model";
import { NotFoundError, BadRequestError } from "../utils/errors";
import { logData, logError } from "../utils/logger";
import { Request, Response } from "../utils/Types";
import asyncHandler from "express-async-handler";
import walletModel from "../models/wallet.model";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await userModel.find();
    return logData(res, 200, { users });
});

export const getAllUserWallets = asyncHandler(
    async (req: Request, res: Response) => {
        const wallets = await walletModel.find().populate({
            path: "user.userId",
            select: "fullName email username",
        });

        return logData(res, 200, { wallets });
    }
);

export const getTotalNumberOfUsers = asyncHandler(
    async (req: Request, res: Response) => {
        const totalUsers = await userModel.countDocuments();
        logData(res, 200, { totalUsers });
    }
);

export const suspendUserAccount = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { reason } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return logError(res, new NotFoundError("User not found"));
        }

        user.isSuspended = true;
        user.suspensionReason = reason;
        user.suspendedAt = new Date();

        await user.save();

        return logData(res, 200, {
            message: "User account suspended successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isSuspended: user.isSuspended,
                suspensionReason: user.suspensionReason,
                suspendedAt: user.suspendedAt
            }
        });
    }
);

export const activateUserAccount = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;

        const user = await userModel.findById(userId);
        if (!user) {
            return logError(res, new NotFoundError("User not found"));
        }

        user.isSuspended = false;
        user.suspensionReason = undefined;
        user.suspendedAt = undefined;

        await user.save();

        return logData(res, 200, {
            message: "User account activated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isSuspended: user.isSuspended
            }
        });
    }
);

export const getUserSuspensionStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.params;

        const user = await userModel.findById(userId,
            'username email isSuspended suspensionReason suspendedAt');

        if (!user) {
            return logError(res, new NotFoundError("User not found"));
        }

        return logData(res, 200, {
            user
        });
    }
);

export const deleteUserByUserId = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.params.userId;
        console.log(userId);
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser)
            return logError(res, new NotFoundError("User not found"));

        return logData(res, 200, {
            message: "User deleted successfully",
            deletedUser,
        });
    }
);

export const updateUserProfit = asyncHandler(
    async (req: Request, res: Response) => {
        const username = req.params.username;
        const { amount, operationType, updateField } = req.body;
        console.log(amount);
        console.log(operationType);
        console.log(updateField);

        const amountConverted = parseFloat(amount);

        const user = await userModel.findOne({ username });
        if (!user) return logError(res, new NotFoundError("User not found"));

        const userWallet = await walletModel.findOne({
            "user.userId": user?._id,
        });
        if (!userWallet)
            return logError(res, new NotFoundError("User wallet not found"));

        // Determine field to update based on `updateField` value
        let targetField;
        if (updateField === "profit") {
            targetField = "profit";
        } else if (updateField === "balance") {
            targetField = "balance";
        } else {
            return logError(
                res,
                new BadRequestError("Invalid field to update")
            );
        }

        if (operationType === "add") {
            userWallet[targetField] += amountConverted;
        } else if (operationType === "remove") {
            if (userWallet[targetField] < amountConverted) {
                return logError(
                    res,
                    new BadRequestError(`Insufficient ${targetField} to remove`)
                );
            }
            userWallet[targetField] -= amountConverted;
        } else {
            return logError(res, new BadRequestError("Invalid operation type"));
        }

        await userWallet.save();

        return logData(res, 200, {
            message: `User ${targetField} updated successfully`,
            userWallet,
        });
    }
);
