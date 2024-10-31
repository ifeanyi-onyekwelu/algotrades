import { Request, Response } from "express";
import investminvestmentModel from "../models/investment.model";
import userModel from "../models/user.model";
import asyncHandler from "express-async-handler";
import { NotFoundError, BadRequestError } from "../utils/errors";
import mongoose from "mongoose";
import investmentModel from "../models/investment.model";

// List all investments (with optional filtering)
export const getAllInvestments = asyncHandler(
    async (req: Request, res: Response) => {
        const { status, user } = req.query;
        const filter: any = {};

        if (status) filter.status = status;
        if (user) filter.user = new mongoose.Types.ObjectId(user as string);

        const investments = await investmentModel
            .find(filter)
            .populate("user", "name email") // Populate user details if needed
            .populate("plan.planId", "name duration initialInvestment"); // Populate plan details

        res.status(200).json({ success: true, investments });
    }
);

// Get a specific investment by ID
export const getInvestmentById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const investment = await investmentModel
            .findById(id)
            .populate("user", "name email")
            .populate("plan.planId", "name duration initialInvestment");

        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        res.status(200).json({ success: true, investment });
    }
);

// Delete investment (soft-delete by marking status as 'inactive')
export const deleteInvestment = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const investment = await investmentModel.findById(id);
        if (!investment) {
            throw new NotFoundError("Investment not found");
        }

        await investment.delete();

        res.status(200).json({
            success: true,
            message: "Investment deleted",
        });
    }
);
