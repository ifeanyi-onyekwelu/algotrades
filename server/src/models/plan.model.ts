import mongoose from "mongoose";

export interface IPlan {
    name: string;
    duration: 5 | 10;
    durationType: string;
    initialInvestment: number;
    profit: number;
    createdAt?: Date;
}

const planSchema = new mongoose.Schema<IPlan>(
    {
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 5,
        },
        durationType: {
            type: String,
            enum: ["days", "months"],
            required: true,
        },
        initialInvestment: {
            type: Number,
            required: true,
        },
        profit: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Plan ||
    mongoose.model<IPlan>("Plan", planSchema);
