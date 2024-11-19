import express from "express";
import userModel from "../models/user.model";
import planModel from "../models/plan.model";
import walletModel from "../models/wallet.model";

const router = express.Router();

// Function to calculate profit (your existing logic)
const calculateProfit = async () => {
    try {
        const users = await userModel.find({
            "currentPlan.planId": { $ne: null },
        });

        for (const user of users) {
            const { planId, simulatedDays = 0 } = user.currentPlan;
            const plan = await planModel.findById(planId);

            if (!plan) continue;

            const dailyProfit = plan.profit / plan.duration;

            if (simulatedDays + 1 < plan.duration) {
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                user.currentPlan.simulatedDays += 1;
                user.currentPlan.profitAccumulated += dailyProfit;
                await user.save();

                console.log(
                    `Updated profit for user ${
                        user.username
                    } by ${dailyProfit} (Day ${simulatedDays + 1} of ${
                        plan.duration
                    })`
                );
            } else {
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                user.currentPlan.profitAccumulated += dailyProfit;
                user.currentPlan = null;
                await user.save();

                console.log(`Ended investment for user ${user.username}`);
            }
        }
    } catch (error) {
        console.error("Error updating profits:", error);
    }
};

// Cron route
router.post("/calculate-profit", async (req, res) => {
    try {
        await calculateProfit();
        res.status(200).send({
            success: true,
            message: "Profit calculated successfully!",
        });
    } catch (error) {
        console.error("Error in cron route:", error);
        res.status(500).send({ success: false, message: "An error occurred." });
    }
});

export default router;
