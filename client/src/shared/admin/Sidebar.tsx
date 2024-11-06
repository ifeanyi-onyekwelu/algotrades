import { Sidebar } from "flowbite-react";
import { PiHandDepositFill } from "react-icons/pi";
import { MdOutlinePending } from "react-icons/md";
import { TiInputChecked } from "react-icons/ti";
import { FcCancel } from "react-icons/fc";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoSettings, IoWallet } from "react-icons/io5";
import { PiHandWithdrawFill } from "react-icons/pi";
import { GoMultiSelect } from "react-icons/go";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../../assets/images/logo.png";
import { IoClose } from "react-icons/io5";
import { GiProfit } from "react-icons/gi";

// Import hooks for counts
import {
    useGetAllPendingDepositsQuery,
    useGetAllPendingWithdrawalsQuery,
} from "../../features/admin/api/adminApiSlice";

const AdminSidebar = ({ isOpen, toggleSidebar }: any) => {
    // Fetch pending deposit and withdrawal counts
    const { data: pendingDeposits, isLoading: loadingDeposits } =
        useGetAllPendingDepositsQuery({});

    const { data: pendingWithdrawals, isLoading: loadingWithdrawals } =
        useGetAllPendingWithdrawalsQuery({});

    if (loadingDeposits || loadingWithdrawals) {
        return <p>Loading stats...</p>;
    }

    const pendingDepositsCount = pendingDeposits.deposits.length || 0;
    const pendingWithdrawalsCount = pendingWithdrawals.withdrawals.length || 0;

    return (
        <Sidebar
            className={`bg-charcolGrey text-white fixed w-[64%] sm:w-[25%] h-full transition-transform transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 sm:block z-50`}
            id="sidebar"
        >
            <div className="flex justify-between">
                <Sidebar.Logo href="#" img={Logo} imgAlt="Admin Panel Logo" />
                <IoClose
                    className="text-black text-3xl cursor-pointer sm:hidden"
                    onClick={toggleSidebar}
                />
            </div>

            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to="/admin"
                        icon={TbLayoutDashboardFilled}
                    >
                        Dashboard
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/investments"
                        icon={GiProfit}
                    >
                        Investments
                    </Sidebar.Item>

                    <Sidebar.Item as={Link} to="/admin/wallets" icon={IoWallet}>
                        Wallets
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/plans"
                        icon={GoMultiSelect}
                    >
                        All Plans
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/deposits/all"
                        icon={PiHandDepositFill}
                    >
                        All Deposits
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/deposits/pending"
                        icon={MdOutlinePending}
                    >
                        Pending Deposits
                        <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                            {pendingDepositsCount}
                        </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/deposits/approved"
                        icon={TiInputChecked}
                    >
                        Approved Deposits
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/deposits/declined"
                        icon={FcCancel}
                    >
                        Rejected Deposits
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/withdrawals/all"
                        icon={PiHandWithdrawFill}
                    >
                        All Withdrawals
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/withdrawals/pending"
                        icon={MdOutlinePending}
                    >
                        Pending Withdrawals
                        <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                            {pendingWithdrawalsCount}
                        </span>
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/withdrawals/approved"
                        icon={TiInputChecked}
                    >
                        Approved Withdrawals
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/withdrawals/declined"
                        icon={FcCancel}
                    >
                        Rejected Withdrawals
                    </Sidebar.Item>
                </Sidebar.ItemGroup>

                {/* Settings */}
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as={Link}
                        to="/admin/settings"
                        icon={IoSettings}
                    >
                        Settings
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default AdminSidebar;
