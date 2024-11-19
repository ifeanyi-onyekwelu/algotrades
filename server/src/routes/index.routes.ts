import express from "express";
import authRoutes from "./auth.routes";
import withdrawalRoutes from "./withdrawal.routes";
import depositRoutes from "./deposit.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import planRoutes from "./plans.routes";
import cronRoutes from "./cron.routes";
import transferRoutes from "./transfer.routes";
import authGuard from "../middlewares/authGuard";
import adminOnly from "../middlewares/adminOnly";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/deposits", authGuard, depositRoutes);
router.use("/withdrawals", authGuard, withdrawalRoutes);
router.use("/user", authGuard, userRoutes);
router.use("/transfer", authGuard, transferRoutes);
router.use("/admin", authGuard, adminOnly, adminRoutes);
router.use("/plans", planRoutes);
router.use("/cron", cronRoutes);

export default router;
