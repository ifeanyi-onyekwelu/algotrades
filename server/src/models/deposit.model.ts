import mongoose from "mongoose";

export interface IDeposit {
    user: mongoose.Schema.Types.ObjectId;
    plan: mongoose.Schema.Types.ObjectId;
    cryptocurrency: string;
    currency: string;
    amount: number;
    status: "pending" | "approved" | "rejected";
    isReinvestment?: boolean; // New field to track if it's a reinvestment
    createdAt?: Date;
    updatedAt?: Date;
}

const depositSchema = new mongoose.Schema<IDeposit>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: [true, "Please specify a plan"],
        },
        currency: {
            type: String,
            required: [true, "Please specify a currency"],
        },
        cryptocurrency: {
            type: String,
            required: [true, "Please specify a cryptocurrency"],
        },
        amount: {
            type: Number,
            required: [true, "Please specify the deposit amount"],
        },
        status: {
            type: String,
            default: "pending",
        },
        isReinvestment: {
            type: Boolean,
            default: false, // Default to false, unless specified
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Deposit ||
    mongoose.model<IDeposit>("Deposit", depositSchema);
