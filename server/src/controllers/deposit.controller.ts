import { Request, Response } from "../utils/Types";
import depositModel from "../models/deposit.model";
import asynchHandler from "express-async-handler";
import { emailService } from "..";
import { logData, logError } from "../utils/logger";
import { getUserById } from "../services/user.service";
import planModel from "../models/plan.model";
import { BadRequestError } from "../utils/errors";
import walletModel from "../models/wallet.model";
import investmentModel from "../models/investment.model";

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

        // Create a new deposit entry
        const deposit = await depositModel.create({
            user: user?._id,
            plan: selectedPlan._id,
            amount: depositData.amount,
            cryptocurrency: depositData.cryptocurrency,
            currency: depositData.currency,
        });

        // Calculate the investment end date
        const investmentStartDate = new Date();
        investmentStartDate.setDate(investmentStartDate.getDate());
        const investmentEndDate = new Date();
        investmentEndDate.setDate(
            investmentEndDate.getDate() + selectedPlan.duration
        );

        // Create a new investment entry
        const investment = await investmentModel.create({
            user: user?._id,
            plan: {
                planId: selectedPlan._id,
                planName: selectedPlan.name,
            },
            amount: depositData.amount,
            startDate: investmentStartDate,
            endDate: investmentEndDate,
            isReinvestment: false,
            status: "active",
            profitAccumulated: 0,
        });

        if (deposit) {
            await Promise.all([
                emailService.sendDepositRequest(user, depositData.amount),
                emailService.notifyAdminAboutWithdrawal(
                    user,
                    depositData.amount
                ),
            ]);
        }

        return logData(res, 201, { deposit, investment });
    }
);

export const reinvestHandler = asynchHandler(
    async (req: Request, res: Response) => {
        const { amount, plan, source } = req.body;
        const user = await getUserById(req.session.user.id);
        const wallet = await walletModel.findOne({ "user.userId": user?._id });

        if (!wallet) {
            return logError(res, new BadRequestError("No wallet found"));
        }

        const selectedPlan = await planModel.findById(plan);

        if (!selectedPlan) {
            return logError(res, new BadRequestError("Invalid plan selected"));
        }

        if (amount < selectedPlan.initialInvestment) {
            return logError(
                res,
                new BadRequestError(
                    `Minimum investment for this plan is ${selectedPlan.initialInvestment}`
                )
            );
        }

        if (user.currentPlan) {
            return logError(
                res,
                new BadRequestError(
                    "You already have an active investment. Complete it before reinvesting."
                )
            );
        }

        // Check the source of funds and deduct from the appropriate wallet field
        if (source === "balance" && amount > wallet.balance) {
            return logError(
                res,
                new BadRequestError("Insufficient balance for reinvestment")
            );
        }
        if (source === "profit" && amount > wallet.profit) {
            return logError(
                res,
                new BadRequestError("Insufficient profit for reinvestment")
            );
        }

        // Deduct the amount from the specified source
        if (source === "balance") {
            wallet.balance -= amount;
        } else if (source === "profit") {
            wallet.profit -= amount;
        } else {
            return logError(
                res,
                new BadRequestError("Invalid source specified")
            );
        }
        await wallet.save();

        const investmentStartDate = new Date();
        investmentStartDate.setDate(investmentStartDate.getDate());
        // Calculate the new investment end date
        const investmentEndDate = new Date();
        investmentEndDate.setDate(
            investmentEndDate.getDate() + selectedPlan.duration
        );

        // Create a new investment entry
        const investment = await investmentModel.create({
            user: user?._id,
            plan: {
                planId: selectedPlan._id,
                planName: selectedPlan.name,
            },
            amount,
            startDate: investmentStartDate,
            endDate: investmentEndDate,
            isReinvestment: true,
            status: "active",
            profitAccumulated: 0,
        });

        // Update user's current plan
        if (user) {
            user.currentPlan = {
                planId: selectedPlan._id,
                planName: selectedPlan.name,
                investmentDate: investmentStartDate,
                endDate: investmentEndDate,
                initialInvestment: amount,
            };
            await user.save();
        }

        // Find referrer and give 10% of the reinvestment amount as a reward
        if (user.referredBy) {
            const referrerWallet = await walletModel.findOne({
                "user.userId": user.referredBy,
            });
            if (referrerWallet) {
                referrerWallet.profit += amount * 0.1; // 10% of the reinvestment
                await referrerWallet.save();
            }
        }

        if (investment) {
            await Promise.all([
                emailService.sendDepositRequest(user, amount),
                emailService.notifyAdminAboutWithdrawal(user, amount),
            ]);
        }

        return logData(res, 201, {
            message: "Reinvestment successful",
            investment,
        });
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
