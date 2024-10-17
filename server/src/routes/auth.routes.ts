import express from "express";
import {
    register,
    login,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
    adminRegister,
    verifyEmail,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/admin-register", adminRegister);
router.post("/register", register);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
