import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import DashboardPage from "../features/user/pages/DashboardPage.tsx";
import DepositPage from "../features/user/pages/DepositPage.tsx";
import WithdrawalPage from "../features/user/pages/WithdrawalPage.tsx";
import AffiliatePage from "../features/user/pages/AffiliatePage.tsx";
import ActivitiesPage from "../features/user/pages/ActivitiesPage.tsx";
import ReinvestPage from "../features/user/pages/ReinvestPage.tsx";
import TransferPage from "../features/user/pages/TransferPage.tsx";
import EmailVerified from "../features/auth/pages/VerifyEmail.tsx";
import KycPage from "../features/user/pages/KycPage.tsx";

function UserRoutes() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="me" element={<DashboardPage />} />
                <Route path="deposit" element={<DepositPage />} />
                <Route path="withdraw" element={<WithdrawalPage />} />
                <Route path="affiliate" element={<AffiliatePage />} />
                <Route path="activities" element={<ActivitiesPage />} />
                <Route path="reinvest" element={<ReinvestPage />} />
                <Route path="transfer" element={<TransferPage />} />
                <Route path="kyc" element={<KycPage />} />
                <Route path="email-verified" element={<EmailVerified />} />
            </Route>
        </Routes>
    );
}

export default UserRoutes;
