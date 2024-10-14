import {
    withdrawalHandler,
    getAllWithdrawals,
    getTotalWithdrawal,
} from "../controllers/withdrawal.controller";
import { Router } from "express";

const router = Router();

router.post("/", withdrawalHandler);
router.get("/all", getAllWithdrawals);
router.get("/total", getTotalWithdrawal);

export default router;
