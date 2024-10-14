import mongoose from "mongoose";

// Define the interface for the withdrawal schema
interface IWithdrawal {
    user: mongoose.Schema.Types.ObjectId;
    amount: number;
    status?: "pending" | "approved" | "rejected";
    currency: string;
    profitOrBalance: "balance" | "profit";
    createdAt?: Date;
    updatedAt?: Date;
}

const withdrawalSchema = new mongoose.Schema<IWithdrawal>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: [true, "Please specify an amount"],
        },
        status: {
            type: String,
            default: "pending",
        },
        currency: {
            type: String,
            required: [true, "Please specify a currency"],
        },
        profitOrBalance: {
            type: String,
            required: true,
            enum: ["balance", "profit"], // Ensure only "balance" or "profit" is allowed
            default: "balance",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Withdrawal ||
    mongoose.model<IWithdrawal>("Withdrawal", withdrawalSchema);
