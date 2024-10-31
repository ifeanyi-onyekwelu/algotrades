import mongoose from "mongoose";

export interface IInvestment {
    user: mongoose.Schema.Types.ObjectId;
    plan: {
        planId: mongoose.Types.ObjectId;
        planName: string;
    };
    amount: number;
    startDate: Date;
    endDate: Date;
    isReinvestment: boolean;
    status: "active" | "completed";
    profitAccumulated: number;
}

const investmentSchema = new mongoose.Schema<IInvestment>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: {
        planId: {
            type: mongoose.Types.ObjectId,
            ref: "Plan",
            default: null,
        },
        planName: { type: String, default: null },
    },
    amount: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    isReinvestment: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    profitAccumulated: { type: Number, default: 0 },
});

export default mongoose.models.Investment ||
    mongoose.model<IInvestment>("Investment", investmentSchema);
