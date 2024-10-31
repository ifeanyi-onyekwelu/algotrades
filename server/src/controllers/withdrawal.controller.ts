import { Request, Response } from "../utils/Types";
import withdrawalModel from "../models/withdrawal.model";
import asynchHandler from "express-async-handler";
import { emailService } from "..";
import { logData } from "../utils/logger";
import { getUserById } from "../services/user.service";
import walletModel from "../models/wallet.model";

const formatSourceText = (source: string) => {
    return source
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
};

export const withdrawalHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const withdrawObject = req.body;
        const withdrawalAmount = withdrawObject.amount;

        // Get user details
        const user = await getUserById(req.session.user.id);

        // Fetch user's wallet
        const wallet = await walletModel.findOne({ "user.userId": user?._id });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        let availableFunds = 0;
        if (withdrawObject.source === "balance") {
            availableFunds = wallet.balance;
        } else if (withdrawObject.source === "profit") {
            availableFunds = wallet.profit;
        } else if (withdrawObject.source === "referralBonus") {
            availableFunds = wallet.referralBonus;
        } else {
            return res
                .status(400)
                .json({ message: "Invalid withdrawal source" });
        }

        // Validate that the user has sufficient funds for the withdrawal
        if (availableFunds < withdrawalAmount) {
            return res.status(400).json({
                message: `Insufficient ${formatSourceText(
                    withdrawObject.source
                )} to withdraw`,
            });
        }

        // Deduct the withdrawal amount from the appropriate source
        if (withdrawObject.source === "balance") {
            wallet.balance -= withdrawalAmount;
        } else if (withdrawObject.source === "profit") {
            wallet.profit -= withdrawalAmount;
        }

        // Save the updated wallet
        await wallet.save();

        // Create withdrawal record
        const withdrawal = await withdrawalModel.create({
            ...withdrawObject,
            user: user?._id,
        });

        // Send notifications if withdrawal is successful
        if (withdrawal) {
            await Promise.all([
                emailService.sendWithdrawalRequest(user, withdrawObject.amount),
                emailService.notifyAdminAboutWithdrawal(
                    user,
                    withdrawObject.amount
                ),
            ]);
        }

        return logData(res, 201, { withdrawal });
    }
);

export const getAllWithdrawals = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const withdrawals = await withdrawalModel.find({ user: user?._id });

        return logData(res, 201, { withdrawals });
    }
);

export const getTotalWithdrawal = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        const withdrawals = await withdrawalModel.find({
            user: user?._id,
            status: "approved",
        });

        let totalAmount = 0;
        withdrawals.forEach((withdrawal) => {
            totalAmount += withdrawal.amount;
        });

        return logData(res, 201, { totalAmount });
    }
);
