import mongoose from "mongoose";

export interface IWallet {
    user?: {
        userId: mongoose.Types.ObjectId;
        fullName: string;
        email: Date;
    };
    balance: number;
    profit: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const walletSchema = new mongoose.Schema<IWallet>(
    {
        user: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            fullName: String,
            email: String,
        },
        balance: {
            type: Number,
            default: 0.0,
        },
        profit: {
            type: Number,
            default: 0.0,
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

export default mongoose.models.Wallet ||
    mongoose.model<IWallet>("Wallet", walletSchema);
