import mongoose from "mongoose";
import walletModel from "../models/wallet.model"; // Adjust the path as necessary
import userModel from "../models/user.model"; // Adjust the path as necessary

const updateWallets = async () => {
    try {
        const wallets = await walletModel.find();

        for (const wallet of wallets) {
            if (wallet.user && wallet.user.userId) {
                const user = await userModel
                    .findById(wallet.user.userId)
                    .select("username");
                if (user && user.username) {
                    wallet.user.username = user.username;
                    await wallet.save();
                }
            }
        }

        console.log("Wallets updated successfully!");
    } catch (error) {
        console.error("Error updating wallets:", error);
    } finally {
        mongoose.connection.close();
    }
};

export default updateWallets;
