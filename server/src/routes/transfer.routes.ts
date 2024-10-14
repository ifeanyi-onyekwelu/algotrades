import {
    transferFunds,
    getUserTransfers,
    checkUsername,
} from "../controllers/transfer.controller";
import { Router } from "express";

const router = Router();

router.post("/", transferFunds);
router.get("/all", getUserTransfers);
router.get("/check-username", checkUsername);

export default router;
