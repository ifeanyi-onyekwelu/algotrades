import mongoose from "mongoose";
import walletModel from "@/models/wallet.model";
import userModel from "@/models/user.model";

const updateWalletsWithUsername = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://thetechcreator:justplainjavascript@cluster1.ux2pb.mongodb.net/?retryWrites=true&w=majority&appName=cluster1"
        );

        const wallets = await walletModel.find();
        for (const wallet of wallets) {
            if (wallet.user?.userId) {
                const user = await userModel
                    .findById(wallet.user.userId)
                    .select("username");
                if (user && user.username) {
                    await walletModel.findByIdAndUpdate(wallet._id, {
                        "user.username": user.username,
                    });
                }
            }
        }

        console.log("Wallets updated successfully.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error updating wallets:", error);
        mongoose.connection.close();
    }
};

export default updateWalletsWithUsername;
