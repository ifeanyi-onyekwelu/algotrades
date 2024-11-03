import userModel from "@/models/user.model";
import { generateReferralLink, generateToken } from "./jwtUtils";
import mongoose from "mongoose";

const updateUserReferralToken = async (userId: mongoose.Types.ObjectId) => {
    try {
        const newReferralLink = await generateReferralLink(userId);

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
            await updateUserReferralToken(user._id);
        }

        console.log(
            "All user referral links checked and updated if necessary."
        );
    } catch (error) {
        console.error("Error updating referral links:", error);
    }
};

export default updateAllUserReferralTokens;
