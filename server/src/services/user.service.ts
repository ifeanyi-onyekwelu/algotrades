// userService.js
import mongoose from "mongoose";
import userModel from "../models/user.model";
import { NotFoundError } from "../utils/errors";

type UserId = mongoose.Schema.Types.ObjectId;

// Fetch a user by ID
export const getUserById = async (userId: UserId) => {
    try {
        const user = await userModel.findOne({ _id: userId });
        return user;
    } catch (error) {
        throw new NotFoundError("User not found");
    }
};

// Update user profile
export const updateUserProfile = async (userId: UserId, profileData: any) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $set: profileData },
            { new: true } // Return the updated document
        );
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    } catch (error: any) {
        throw new Error(`Error updating profile: ${error.message}`);
    }
};

// Change user profile image
export const changeProfileImage = async (userId: UserId, imageUrl: string) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $set: { profilePicture: imageUrl } },
            { new: true } // Return the updated document
        );
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    } catch (error: any) {
        throw new Error(`Error updating profile image: ${error.message}`);
    }
};
