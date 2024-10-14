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

export const getTotalNumberOfUsers = asyncHandler(
    async (req: Request, res: Response) => {
        const totalUsers = await userModel.countDocuments();
        logData(res, 200, { totalUsers });
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
        const { amount, operationType } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) return logError(res, new NotFoundError("User not found"));

        const userWallet = await walletModel.findOne({
            "user.userId": user?._id,
        });
        if (!userWallet)
            return logError(res, new NotFoundError("User wallet not found"));

        if (operationType === "add") {
            userWallet.profit += amount;
        } else if (operationType === "remove") {
            if (userWallet.balance < amount) {
                return logError(
                    res,
                    new BadRequestError("Insufficient balance to remove profit")
                );
            }
            // Deduct from the user's balance and add to profit
            userWallet.balance -= amount;
        } else {
            return logError(res, new BadRequestError("Invalid operation type"));
        }

        await userWallet.save();

        return logData(res, 200, {
            message: "User profit updated successfully",
            userWallet,
        });
    }
);
