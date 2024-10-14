import { Request, Response } from "../utils/Types";
import depositModel from "../models/deposit.model";
import asynchHandler from "express-async-handler";
import { emailService } from "..";
import { logData, logError } from "../utils/logger";
import { getUserById } from "../services/user.service";
import planModel from "../models/plan.model";
import { BadRequestError } from "../utils/errors";
import walletModel from "../models/wallet.model";

export const depositHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const depositData = req.body;

        const user = await getUserById(req.session.user.id);

        const selectedPlan = await planModel.findById(depositData.plan);

        if (!selectedPlan) {
            return logError(res, new BadRequestError("Invalid plan selected"));
        }

        if (depositData.amount < selectedPlan.initialInvestment) {
            return logError(
                res,
                new BadRequestError(
                    `Minimum investment for this plan is ${selectedPlan.initialInvestment}`
                )
            );
        }

        const deposit = await depositModel.create({
            user: user?._id,
            plan: selectedPlan._id,
            amount: depositData.amount,
            cryptocurrency: depositData.cryptocurrency,
            currency: depositData.currency,
        });

        const investmentEndDate = new Date();
        investmentEndDate.setDate(
            investmentEndDate.getDate() + selectedPlan.duration
        );

        if (user) {
            user.currentPlan = {
                planId: selectedPlan._id,
                planName: selectedPlan.name,
                investmentDate: new Date(),
                endDate: investmentEndDate,
            };
        }

        await user?.save();

        if (deposit) {
            await Promise.all([
                emailService.sendDepositRequest(user, depositData.amount),
                emailService.notifyAdminAboutWithdrawal(
                    user,
                    depositData.amount
                ),
            ]);
        }

        return logData(res, 201, { deposit });
    }
);

export const reinvestHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const reinvestData = req.body;

        const user = await getUserById(req.session.user.id);
        const wallet = await walletModel.findOne({ "user.userId": user?._id });

        if (!wallet) {
            return logError(res, new BadRequestError("No wallet found"));
        }

        const selectedPlan = await planModel.findById(reinvestData.plan);

        if (!selectedPlan) {
            return logError(res, new BadRequestError("Invalid plan selected"));
        }

        if (reinvestData.amount < selectedPlan.initialInvestment) {
            return logError(
                res,
                new BadRequestError(
                    `Minimum investment for this plan is ${selectedPlan.initialInvestment}`
                )
            );
        }

        if (reinvestData.amount > wallet.balance) {
            return logError(
                res,
                new BadRequestError(
                    "Insufficient wallet balance for reinvestment"
                )
            );
        }

        // Create a new deposit for reinvestment
        const deposit = await depositModel.create({
            user: user?._id,
            plan: selectedPlan._id,
            amount: reinvestData.amount,
            cryptocurrency: "BTC", // Set default or adjust based on your logic
            currency: "USD", // Set default or adjust based on your logic
            isReinvestment: true, // Mark as reinvestment
        });

        // Update the wallet by deducting the reinvested amount
        wallet.balance -= reinvestData.amount;
        await wallet.save();

        // Calculate the new investment end date
        const investmentEndDate = new Date();
        investmentEndDate.setDate(
            investmentEndDate.getDate() + selectedPlan.duration
        );

        // Update user's current plan
        if (user) {
            user.currentPlan = {
                planId: selectedPlan._id,
                planName: selectedPlan.name,
                investmentDate: new Date(),
                endDate: investmentEndDate,
            };
        }

        await user?.save();

        if (deposit) {
            await Promise.all([
                emailService.sendDepositRequest(user, reinvestData.amount),
                emailService.notifyAdminAboutWithdrawal(
                    user,
                    reinvestData.amount
                ),
            ]);
        }

        return logData(res, 201, { deposit });
    }
);

export const getAllDeposits = asynchHandler(
    async (req: Request, res: Response) => {
        console.log("Here");
        const user = await getUserById(req.session.user.id);
        console.log(user);

        const deposits = await depositModel.find({ user: user?._id });

        return logData(res, 200, { deposits });
    }
);

export const getTotalDeposit = asynchHandler(
    async (req: Request, res: Response) => {
        const user = await getUserById(req.session.user.id);

        // Fetch all deposits for the particular user based on the user ID
        const deposits = await depositModel.find({
            user: user?._id,
            status: "approved",
        });

        // Calculate the total amount deposited by the user
        let totalAmount = 0;
        deposits.forEach((deposit) => {
            totalAmount += deposit.amount;
        });

        return logData(res, 200, { totalAmount });
    }
);
