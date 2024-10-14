import {
    getAllUsers,
    updateUserProfit,
    getTotalNumberOfUsers,
    deleteUserByUserId,
} from "../controllers/admin.controller";

import {
    getTotalDeposit,
    handleDeposit,
    fetchAllDeposits,
    fetchAllPendingDeposits,
    fetchAllApprovedDeposits,
    fetchAllRejectedDeposits,
} from "../controllers/admin.deposit.controller";

import {
    getTotalWithdrawal,
    handleWithdrawal,
    fetchAllWithdrawals,
    fetchAllPendingWithdrawals,
    fetchAllApprovedWithdrawals,
    fetchAllRejectedWithdrawals,
} from "../controllers/admin.withdrawal.controller";

import {
    createPlan,
    editPlan,
    getAllPlans,
} from "../controllers/plans.controller";
import { Router } from "express";

const router = Router();

router.get("/users", getAllUsers);
router.put("/update-profit/:username", updateUserProfit);
router.get("/total-users", getTotalNumberOfUsers);
router.delete("/users/:userId", deleteUserByUserId);

router.get("/plans/all", getAllPlans);
router.post("/plans", createPlan);
router.put("/plans/:planId", editPlan);

router.put("/handle-deposit/:depositId/:status", handleDeposit);
router.put("/handle-withdrawal/:withdrawalId/:status", handleWithdrawal);

router.get("/total-deposit", getTotalDeposit);
router.get("/get-all-deposits", fetchAllDeposits);
router.get("/get-all-pending-deposits", fetchAllPendingDeposits);
router.get("/get-all-approved-deposits", fetchAllApprovedDeposits);
router.get("/get-all-rejected-deposits", fetchAllRejectedDeposits);

router.get("/get-all-withdrawals", fetchAllWithdrawals);
router.get("/get-all-pending-withdrawals", fetchAllPendingWithdrawals);
router.get("/get-all-approved-withdrawals", fetchAllApprovedWithdrawals);
router.get("/get-all-rejected-withdrawals", fetchAllRejectedWithdrawals);
router.get("/total-withdrawal", getTotalWithdrawal);

export default router;
