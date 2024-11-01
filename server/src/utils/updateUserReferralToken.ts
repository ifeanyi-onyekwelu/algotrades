import userModel from "@/models/user.model";
import { generateToken } from "./jwtUtils";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const isTokenExpired = (token: string): boolean => {
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return false;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return true;
        }
        console.error("Token verification error:", error);
        throw error;
    }
};

const updateUserReferralToken = async (
    userId: mongoose.Types.ObjectId,
    existingToken: string
) => {
    try {
        if (existingToken && !isTokenExpired(existingToken)) {
            console.log(`Token still valid for user ${userId}`);
            return existingToken;
        }

        const newToken = generateToken(userId, "1d");
        const newReferralLink = `${process.env.CLIENT_URL}/auth/register?ref=${newToken}`;

        await userModel.findByIdAndUpdate(userId, {
            referralLink: newReferralLink,
        });

        console.log(`Updated referral link for user ${userId}`);
        return newReferralLink;
    } catch (error) {
        console.error(
            `Failed to update referral link for user ${userId}:`,
            error
        );
        throw error;
    }
};

const updateAllUserReferralTokens = async () => {
    try {
        const users = await userModel.find();

        for (const user of users) {
            if (user._id && user.referralLink) {
                const token = user.referralLink.split("ref=")[1];
                await updateUserReferralToken(user._id, token);
            }
        }

        console.log(
            "All user referral links checked and updated if necessary."
        );
    } catch (error) {
        console.error("Error updating referral links:", error);
    }
};

export default updateAllUserReferralTokens;
