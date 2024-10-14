import mongoose from "mongoose";

export interface ITransfer {
    user: mongoose.Schema.Types.ObjectId;
    receiverUsername: string;
    amount: number;
    status: "approved" | "rejected";
    createdAt?: Date;
}

const transferSchema = new mongoose.Schema<ITransfer>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverUsername: {
            type: String,
            required: [true, "Please specify a receiver username"],
        },
        amount: {
            type: Number,
            required: [true, "Please specify the transfer amount"],
        },
        status: {
            type: String,
            default: "approved",
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

export default mongoose.models.Transfer ||
    mongoose.model<ITransfer>("Transfer", transferSchema);
