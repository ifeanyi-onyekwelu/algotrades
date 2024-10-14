import planModel from "../models/plan.model";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { logError, logData } from "../utils/logger";
import { Request, Response } from "../utils/Types";
import asyncHandler from "express-async-handler";

export const createPlan = asyncHandler(async (req: Request, res: Response) => {
    const { name, duration, initialInvestment, profit } = req.body;

    // Validate input
    if (!name || !initialInvestment || !profit) {
        return logError(
            req,
            new BadRequestError("All fields must be provided")
        );
    }

    // Create and save the plan
    const newPlan = new planModel({
        name,
        duration,
        initialInvestment,
        profit,
    });

    const savedPlan = await newPlan.save();
    return logData(res, 201, { savedPlan });
});

export const editPlan = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, duration, initialInvestment, profit } = req.body;

    // Find the plan by ID
    const plan = await planModel.findById(id);
    if (!plan) {
        return logError(res, new NotFoundError("Plan not found!"));
    }

    // Update the plan details
    plan.name = name || plan.name;
    plan.duration = duration || plan.duration;
    plan.initialInvestment = initialInvestment || plan.initialInvestment;
    plan.profit = profit || plan.profit;

    const updatedPlan = await plan.save();
    return logData(res, 200, { updatedPlan });
});

export const getAllPlans = asyncHandler(async (req: Request, res: Response) => {
    const plans = await planModel.find();
    return logData(res, 200, { plans });
});
