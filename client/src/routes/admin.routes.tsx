import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout.tsx";
import Users from "../features/admin/pages/Users.tsx";
import AllDeposits from "../features/admin/pages/Deposits/AllDeposits.tsx";
import PendingDeposits from "../features/admin/pages/Deposits/PendingDeposits.tsx";
import ApprovedDeposits from "../features/admin/pages/Deposits/ApprovedDeposits.tsx";
import DeclinedDeposits from "../features/admin/pages/Deposits/DeclinedDeposits.tsx";
import AllWithdrawals from "../features/admin/pages/Withdrawals/AllWithdrawals.tsx";
import PendingWithdraw from "../features/admin/pages/Withdrawals/PendingWithdrawals.tsx";
import ApprovedWithdrawals from "../features/admin/pages/Withdrawals/ApprovedWithdrawals.tsx";
import DeclinedWithdrawals from "../features/admin/pages/Withdrawals/DeclinedWithdrawals.tsx";
import Plans from "../features/admin/pages/Plans.tsx";
import AdminProfile from "../features/admin/pages/Profile.tsx";
import AllUserWallets from "../features/admin/pages/wallets.tsx";
import Investments from "../features/admin/pages/Investments.tsx";

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="" element={<Users />} />
                <Route path="/wallets" element={<AllUserWallets />} />
                <Route path="/deposits/all" element={<AllDeposits />} />
                <Route
                    path="/deposits/approved"
                    element={<ApprovedDeposits />}
                />
                <Route
                    path="/deposits/declined"
                    element={<DeclinedDeposits />}
                />
                <Route path="/deposits/pending" element={<PendingDeposits />} />
                <Route path="/withdrawals/all" element={<AllWithdrawals />} />
                <Route
                    path="/withdrawals/pending"
                    element={<PendingWithdraw />}
                />
                <Route
                    path="/withdrawals/approved"
                    element={<ApprovedWithdrawals />}
                />
                <Route
                    path="/withdrawals/declined"
                    element={<DeclinedWithdrawals />}
                />
                <Route path="/plans" element={<Plans />} />
                <Route path="/settings" element={<AdminProfile />} />
                <Route path="/investments" element={<Investments />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
