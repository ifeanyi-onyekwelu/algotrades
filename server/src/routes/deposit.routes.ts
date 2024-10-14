import {
    depositHandler,
    getAllDeposits,
    getTotalDeposit,
    reinvestHandler,
} from "../controllers/deposit.controller";
import { Router } from "express";

const router = Router();

router.post("/", depositHandler);
router.post("/reinvest", reinvestHandler);
router.get("/all", getAllDeposits);
router.get("/total", getTotalDeposit);

export default router;
