// import cron from "node-cron";
import userModel from "./models/user.model";
import planModel from "./models/plan.model";
import walletModel from "./models/wallet.model";
import Agenda from "agenda";

const MONGO_DB_URI = process.env.LOCAL_DB_URI || "";

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

            // Check if incrementing simulatedDays will complete the plan duration
            if (simulatedDays + 1 < plan.duration) {
                // Update user's wallet profit
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                // Increment the simulated day count
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
                // If this is the last day, update the profit and remove the plan
                await walletModel.findOneAndUpdate(
                    { "user.userId": user._id },
                    { $inc: { profit: dailyProfit } }
                );

                user.currentPlan.profitAccumulated += dailyProfit;
                user.currentPlan = null; // Remove the plan immediately
                await user.save();

                console.log(`Ended investment for user ${user.username}`);
            }
        }
    } catch (error) {
        console.error("Error updating profits:", error);
    }
};

const agenda = new Agenda({
    db: { address: MONGO_DB_URI },
});

agenda.define("calculate daily profit", async () => {
    console.log("Job started: calculate daily profit");
    try {
        await calculateProfit();
        console.log("Job completed successfully: calculate daily profit");
    } catch (error) {
        console.error("Job failed: calculate daily profit", error);
    }
});

(async function () {
    await agenda.start();
    // Schedule the job to run every minute on weekdays (Monday to Friday)
    await agenda.every("0 0 * * 1-5", "calculate daily profit");
})();

// cron.schedule("* * * * *", async () => {
//     console.log("Running profit calculation cron job every hour...");
//     // calculateProfit();
// });

// cron.schedule("0 0 * * 1-5", async () => {
//     console.log("Running daily profit calculation cron job...");
//     calculateProfit();
// });
