import { PiHandDepositFill } from "react-icons/pi";
import { MdOutlinePending } from "react-icons/md";
import { PiHandWithdrawFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { Divider } from "@mui/material";
import StatCard from "./StatCard";
import {
    useGetTotalUsersQuery,
    useGetTotalDepositQuery,
    useGetTotalWithdrawalQuery,
    useGetAllPendingDepositsQuery,
} from "../../features/admin/api/adminApiSlice";

const StatsSection = () => {
    // Fetching the data from the corresponding API endpoints
    const { data: totalUsers, isLoading: usersLoading } =
        useGetTotalUsersQuery(undefined);
    const { data: totalDeposit, isLoading: depositLoading } =
        useGetTotalDepositQuery({});
    const { data: totalWithdrawal, isLoading: withdrawalLoading } =
        useGetTotalWithdrawalQuery({});
    const { data: pendingDeposits, isLoading: pendingLoading } =
        useGetAllPendingDepositsQuery({});
    console.log(pendingDeposits);

    // Handling loading states
    if (usersLoading || depositLoading || withdrawalLoading || pendingLoading) {
        return <p>Loading stats...</p>;
    }

    return (
        <div className="flex flex-wrap flex-col sm:flex-row md:space-x-5 space-y-4 md:space-y-0 rounded-2xl bg-white md:justify-between p-8 md:items-center">
            <StatCard
                icon={<FaUsers />}
                title="Users"
                value={totalUsers.totalUsers || 0}
            />
            <Divider
                orientation="vertical"
                flexItem
                className="divider sm:block hidden"
            />
            <Divider flexItem className="sm:hidden block" />
            <StatCard
                icon={<PiHandDepositFill />}
                title="Deposits ($)"
                value={`$${totalDeposit.totalAmount || 0}`}
            />
            <Divider
                orientation="vertical"
                flexItem
                className="divider sm:block hidden"
            />
            <Divider flexItem className="sm:hidden block" />
            <StatCard
                icon={<PiHandWithdrawFill />}
                title="Withdrawals ($)"
                value={`$${totalWithdrawal.totalAmount || 0}`}
            />
            <Divider
                orientation="vertical"
                flexItem
                className="divider sm:block hidden"
            />
            <Divider flexItem className="sm:hidden block" />
            <StatCard
                icon={<MdOutlinePending />}
                title="Pending"
                value={`${pendingDeposits.deposits.length || 0}`}
            />
        </div>
    );
};

export default StatsSection;
