import mongoose from "mongoose";
import planModel from "../models/plan.model";

const investmentPlans = [
    {
        name: "INVEST $1000 EARN $8,000",
        duration: 5,
        durationType: "days",
        initialInvestment: 1000,
        profit: 8000,
    },
    {
        name: "INVEST $2000 EARN $16,000",
        duration: 5,
        durationType: "days",
        initialInvestment: 2000,
        profit: 16000,
    },
    {
        name: "INVEST $3000 EARN $32,000",
        duration: 5,
        durationType: "days",
        initialInvestment: 3000,
        profit: 32000,
    },
    {
        name: "INVEST $5000 EARN $40,000",
        duration: 5,
        durationType: "days",
        initialInvestment: 5000,
        profit: 40000,
    },
    {
        name: "INVEST $10,000 EARN $80,000",
        duration: 10,
        durationType: "days",
        initialInvestment: 10000,
        profit: 80000,
    },
    {
        name: "INVEST $20,000 EARN $160,000",
        duration: 10,
        durationType: "days",
        initialInvestment: 20000,
        profit: 160000,
    },
    {
        name: "INVEST $50,000 EARN 400,000",
        duration: 10,
        durationType: "days",
        initialInvestment: 50000,
        profit: 400000,
    },
    {
        name: "INVEST $50,000 EARN $500,000",
        duration: 1,
        durationType: "months", // 1 month

        initialInvestment: 50000,
        profit: 500000,
    },
    {
        name: "INVEST $80,000 EARN 800,000",
        duration: 1,
        durationType: "months", // 1 month

        initialInvestment: 80000,
        profit: 800000,
    },
    {
        name: "INVEST $100,000 EARN 1,000,000",
        duration: 1,
        durationType: "months", // 1 month

        initialInvestment: 100000,
        profit: 1000000,
    },
    {
        name: "INVEST $200,000 EARN 2,000,000",
        duration: 1,
        durationType: "months", // 1 month

        initialInvestment: 200000,
        profit: 2000000,
    },
];

const insertInvestmentPlans = async () => {
    try {
        for (const plan of investmentPlans) {
            const existingPlan = await planModel.findOne({ name: plan.name });

            if (!existingPlan) {
                // If the plan doesn't exist, insert it
                await planModel.create(plan);
                console.log(`Plan '${plan.name}' inserted successfully`);
            } else {
                console.log(`Plan '${plan.name}' already exists`);
            }
        }
        console.log("Investment plan insertion process completed");
    } catch (error) {
        console.error("Error adding predefined investment plans:", error);
    }
};

export default insertInvestmentPlans;
