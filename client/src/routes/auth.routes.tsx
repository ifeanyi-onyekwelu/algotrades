import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout.tsx";
import LoginPage from "../features/auth/pages/LoginPage.tsx";
import RegisterPage from "../features/auth/pages/RegisterPage.tsx";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage.tsx";
import AdminLogin from "../features/admin/pages/Login.tsx";
import AdminRegister from "../features/admin/pages/Register.tsx";
import VerifyEmail from "../features/auth/pages/VerifyEmail.tsx";

function AuthRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                    path="forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route path="reset-password" element={<ResetPasswordPage />} />

                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/register" element={<AdminRegister />} />
                <Route path="verify-email" element={<VerifyEmail />} />
            </Route>
        </Routes>
    );
}

export default AuthRoutes;
