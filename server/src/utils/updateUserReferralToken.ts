import userModel from "@/models/user.model";
import { generateToken } from "./jwtUtils";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const isTokenExpired = (token: string): boolean => {
    try {
        // Verify the token with your secret key
        jwt.verify(token, process.env.JWT_SECRET!);
        return false; // Token is valid
    } catch (error) {
        // If there's an error, check if it's due to expiration
        if (error instanceof jwt.TokenExpiredError) {
            return true; // Token has expired
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
        // Check if the existing token has expired
        if (existingToken && !isTokenExpired(existingToken)) {
            console.log(`Token still valid for user ${userId}`);
            return existingToken; // No need to update if token is still valid
        }

        // Generate a new referral token with 1-day expiry for expired tokens
        const newToken = generateToken(userId, "1d");
        const newReferralLink = `${process.env.CLIENT_URL}/auth/register?ref=${newToken}`;

        // Update the user's referral link in the database
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
        const users = await userModel.find(); // Find all users

        for (const user of users) {
            if (user._id && user.referralLink) {
                // Extract the token from the referral link query parameter
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
