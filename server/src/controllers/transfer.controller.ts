import transferModel from "../models/transfer.model";
import walletModel from "../models/wallet.model";
import { Request, Response } from "../utils/Types";
import asyncHandler from "express-async-handler";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { getUserById } from "../services/user.service";
import userModel from "../models/user.model";
import { logData, logError } from "../utils/logger";

// Handle Transfer from User's Wallet
export const transferFunds = asyncHandler(
    async (req: Request, res: Response) => {
        const { receiverUsername, amount } = req.body;
        const user = await getUserById(req.session.user.id);

        // Check if the sender has enough balance
        const senderWallet = await walletModel.findOne({
            "user.userId": user?._id,
        });
        if (!senderWallet)
            return logError(
                res,
                new BadRequestError("Sender wallet not found")
            );

        if (senderWallet.balance < amount) {
            return logError(res, new BadRequestError("Insufficient funds"));
        }

        // Find the receiver by username
        const receiver = await userModel.findOne({
            username: receiverUsername,
        });
        if (!receiver) {
            return logError(res, new BadRequestError("Receiver not found"));
        }

        // Transfer the funds
        senderWallet.balance -= amount;
        await senderWallet.save();

        const receiverWallet = await walletModel.findOne({
            "user.userId": receiver._id,
        });
        if (receiverWallet) {
            receiverWallet.balance += amount;
            await receiverWallet.save();
        } else {
            await walletModel.create({
                user: {
                    userId: receiver._id,
                    fullName: receiver.fullName,
                    email: receiver.email,
                },
                balance: amount,
            });
        }

        // Record the transfer
        const transfer = await transferModel.create({
            user: user?._id,
            receiverUsername,
            amount,
            status: "approved",
        });

        return logData(res, 201, { message: "Transfer successfully!" });
    }
);

// Check if Username is Linked to an Account
export const checkUsername = asyncHandler(
    async (req: Request, res: Response) => {
        const { username } = req.query;
        console.log(`USER NAME: ${username}`);
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return logData(res, 200, {
            message: "User found",
            fullName: user.fullName,
        });
    }
);

// Get All Transfers Made by a User
export const getUserTransfers = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const transfers = await transferModel.find({ user: user?._id });

        return logData(res, 200, { message: "Transfers retrieved", transfers });
    }
);
