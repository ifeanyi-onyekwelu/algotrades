import cron from "node-cron";
import mongoose from "mongoose";
import userModel from "./models/user.model";
import planModel from "./models/plan.model";
import walletModel from "./models/wallet.model";

const calculateProfit = async () => {
    try {
        // Fetch all users with an active investment plan
        const users = await userModel.find({
            "currentPlan.planId": { $ne: null },
        });

        for (const user of users) {
            const { planId, simulatedDays = 0 } = user.currentPlan;
            const plan = await planModel.findById(planId);

            // Ensure the plan exists
            if (!plan) continue;

            // Calculate daily profit
            const dailyProfit = plan.profit / plan.duration;

            // Check if the simulated days are within the duration
            if (simulatedDays < plan.duration) {
                // Update user's wallet profit
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                // Increment the simulated day count
                user.currentPlan.simulatedDays = simulatedDays + 1;
                await user.save();

                console.log(
                    `Updated profit for user ${
                        user.username
                    } by ${dailyProfit} (Day ${simulatedDays + 1} of ${
                        plan.duration
                    })`
                );
            } else {
                // If the duration is completed, remove the current plan
                user.currentPlan = null;
                await user.save();
                console.log(`Ended investment for user ${user.username}`);
            }
        }
    } catch (error) {
        console.error("Error updating profits:", error);
    }
};

// This will run every minute
cron.schedule("* * * * *", () => {
    console.log("Running profit calculation cron job every minute...");
    calculateProfit();
});

// Uncomment the following line to switch to a daily schedule (every 24 hours) after testing
// cron.schedule("0 9 * * 1-5", () => {
//     console.log("Running daily profit calculation cron job...");
//     calculateProfit();
// });
