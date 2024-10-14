import depositModel from "../models/deposit.model";
import { emailService } from "..";
import { logError, logData } from "../utils/logger";
import asyncHandler from "express-async-handler";
import { Request, Response } from "../utils/Types";
import { NotFoundError } from "../utils/errors";
import { getUserById } from "../services/user.service";

const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
};

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

        console.log("DEPOSIT ID", depositId);

        const deposit = await depositModel.findByIdAndUpdate(
            depositId,
            { $set: { status } },
            { new: status }
        );

        if (!deposit)
            return logError(res, new NotFoundError("Deposit not found"));

        const user = getUserById(deposit?.user);

        // send mail to the user and admin
        emailService.sendDepositStatusUpdate(user, deposit.amount, status);

        return logData(res, 200, {
            message: `Deposit ${status} successfully`,
            deposit,
        });
    }
);
