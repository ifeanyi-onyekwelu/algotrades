import depositModel from "../models/deposit.model";
import { emailService } from "..";
import { logError, logData } from "../utils/logger";
import asyncHandler from "express-async-handler";
import { Request, Response } from "../utils/Types";
import { NotFoundError } from "../utils/errors";
import { getUserById } from "../services/user.service";
import walletModel from "../models/wallet.model";
import planModel from "../models/plan.model";

export const fetchAllDeposits = asyncHandler(
    async (req: Request, res: Response) => {
        const deposits = await depositModel.find().populate("user");

        return logData(res, 200, { deposits });
    }
);

export const fetchAllPendingDeposits = asyncHandler(
    async (req: Request, res: Response) => {
        const deposits = await depositModel
            .find({ status: "pending" })
            .populate("user");

        return logData(res, 200, { deposits });
    }
);

export const fetchAllApprovedDeposits = asyncHandler(
    async (req: Request, res: Response) => {
        const deposits = await depositModel
            .find({ status: "approved" })
            .populate("user");

        return logData(res, 200, { deposits });
    }
);

export const fetchAllRejectedDeposits = asyncHandler(
    async (req: Request, res: Response) => {
        const deposits = await depositModel
            .find({ status: "rejected" })
            .populate("user");

        return logData(res, 200, { deposits });
    }
);

export const getTotalDeposit = asyncHandler(
    async (req: Request, res: Response) => {
        const deposits = await depositModel.find({ status: "approved" });

        let totalAmount = 0;
        deposits.forEach((deposit) => {
            totalAmount += deposit.amount;
        });

        return logData(res, 200, { totalAmount });
    }
);

export const handleDeposit = asyncHandler(
    async (req: Request, res: Response) => {
        const status = req.params.status;
        const depositId = req.params.depositId;

        const deposit = await depositModel.findByIdAndUpdate(
            depositId,
            { $set: { status } },
            { new: true }
        );

        if (!deposit) {
            return logError(res, new NotFoundError("Deposit not found"));
        }

        const user = await getUserById(deposit.user);
        const userWallet = await walletModel.findOne({
            "user.userId": user._id,
        });

        if (!userWallet) {
            return logError(res, new NotFoundError("User wallet not found"));
        }

        const investmentPlan = await planModel.findOne({ _id: deposit.plan });

        if (status === "approved") {
            user.currentPlan = {
                planId: investmentPlan._id,
                planName: investmentPlan.name,
                investmentDate: new Date(),
                endDate: new Date(Date.now() + investmentPlan.duration),
                initialInvestment: deposit.amount,
            };
            await user.save();

            userWallet.balance += deposit.amount;
            await userWallet.save();

            // Referral bonus logic
            if (user.referredBy) {
                const referringUserWallet = await walletModel.findOne({
                    "user.userId": user.referredBy,
                });

                if (referringUserWallet) {
                    const referralBonus = deposit.amount * 0.1; // 10% of the deposit amount
                    referringUserWallet.referralBonus += referralBonus;
                    await referringUserWallet.save();
                }
            }
        }

        emailService.sendDepositStatusUpdate(user, deposit.amount, status);

        return logData(res, 200, {
            message: `Deposit ${status} successfully`,
            deposit,
        });
    }
);
