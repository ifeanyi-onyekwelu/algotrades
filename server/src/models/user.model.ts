import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    username: string;
    currentPlan?: {
        planId: mongoose.Types.ObjectId;
        planName: string;
        investmentDate: Date;
        endDate: Date;
        simulatedDays: number;
        initialInvestment: number;
        profitAccumulated: number;
    };
    referrals?: [
        {
            userId: mongoose.Types.ObjectId;
            username: string;
            email: string;
        }
    ];
    referredBy?: mongoose.Types.ObjectId; // New field for tracking who referred this user
    lastLogin: string;
    refreshToken: string | null;
    passwordResetToken: string | null;
    emailVerificationToken: number | null;
    passportNumber: string | null;
    contactAddress: string | null;
    isVerified: boolean;
    referralLink: string | null;
    createdAt: Date;
    role: string;
    profilePicture: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        fullName: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        phoneNumber: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        currentPlan: {
            planId: {
                type: mongoose.Types.ObjectId,
                ref: "Plan",
                default: null,
            },
            planName: { type: String, default: null },
            investmentDate: { type: Date, default: Date.now },
            endDate: { type: Date, default: null },
            simulatedDays: { type: Number, default: 0 },
            initialInvestment: { type: Number, default: 0 },
            profitAccumulated: { type: Number, default: 0 },
        },
        referrals: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    default: null,
                },
                username: { type: String, default: null },
                email: { type: String, default: null },
            },
        ],
        referredBy: {
            type: mongoose.Types.ObjectId,
            ref: "User", // Refers to the user who referred this user
            default: null,
        },
        lastLogin: { type: String },
        refreshToken: { type: String },
        passwordResetToken: { type: String },
        passportNumber: { type: String, default: null },
        contactAddress: { type: String, default: null },
        emailVerificationToken: { type: Number, default: null },
        isVerified: { type: Boolean, default: false },
        referralLink: { type: String },
        createdAt: { type: Date, default: Date.now },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        profilePicture: { type: String },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.User ||
    mongoose.model<IUser>("User", userSchema);
