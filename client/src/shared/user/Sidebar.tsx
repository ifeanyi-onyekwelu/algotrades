"use client";

import { useEffect } from "react";
import { Sidebar } from "flowbite-react";
import {
    FaHistory,
    FaCloudUploadAlt,
    FaCloudDownloadAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BiTransfer } from "react-icons/bi";
import { LuRefreshCcw } from "react-icons/lu";
import { TiSpanner } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { IoClose, IoLogOut } from "react-icons/io5";
import { logout } from "../../features/auth/slices/authSlice";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

const UserSidebar = ({
    isOpen,
    toggleSidebar,
}: {
    isOpen: boolean;
    toggleSidebar: any;
}) => {
    const location = useLocation();
    const { pathname } = location;

    // Use useEffect to handle sidebar behavior on route change
    // useEffect(() => {
    //     // Close sidebar on navigation
    //     if (isOpen) {
    //         toggleSidebar(false);
    //     }
    // }, [pathname, isOpen, toggleSidebar]);

    // Handle sidebar auto-hide on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isOpen) {
                toggleSidebar(false); // Hide the sidebar automatically on resize if on a large screen
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen, toggleSidebar]);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    return (
        <Sidebar
            className={`sidebar-bg text-white fixed w-[64%] sm:w-[20%] h-full transition-transform transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 sm:block z-50`}
        >
            {/* Sidebar Header */}
            <div className="flex justify-between px-4 py-3">
                <Sidebar.Logo
                    href="#"
                    img={Logo}
                    imgAlt="User Dashboard Logo"
                />
                <IoClose
                    className="text-black text-3xl cursor-pointer sm:hidden"
                    onClick={() => toggleSidebar(false)}
                />
            </div>

            {/* Sidebar Links */}
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className="px-2 py-2 text-sm font-semibold text-gray-400 uppercase">
                        Member Account
                    </div>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/me"
                        icon={MdSpaceDashboard}
                        className={`${
                            pathname === "/dashboard/me"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Dashboard
                    </Sidebar.Item>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/deposit"
                        icon={FaCloudDownloadAlt}
                        className={`${
                            pathname === "/dashboard/deposit"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Deposit
                    </Sidebar.Item>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/affiliate"
                        icon={HiUsers}
                        className={`${
                            pathname === "/dashboard/affiliate"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Affiliate
                    </Sidebar.Item>

                    <div className="px-2 py-2 text-sm font-semibold text-gray-400 uppercase">
                        Finance
                    </div>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/reinvest"
                        icon={LuRefreshCcw}
                        className={`${
                            pathname === "/dashboard/reinvest"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Reinvest
                    </Sidebar.Item>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/activities"
                        icon={FaHistory}
                        className={`${
                            pathname === "/dashboard/activities"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Activities
                    </Sidebar.Item>
                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/withdraw"
                        icon={FaCloudUploadAlt}
                        className={`${
                            pathname === "/dashboard/withdraw"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Withdraw
                    </Sidebar.Item>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/transfer"
                        icon={BiTransfer}
                        className={`${
                            pathname === "/dashboard/transfer"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        Transfer
                    </Sidebar.Item>

                    <div className="px-2 py-2 text-sm font-semibold text-gray-400 uppercase">
                        Settings
                    </div>

                    <Sidebar.Item
                        as={Link}
                        to="/dashboard/kyc"
                        icon={TiSpanner}
                        className={`${
                            pathname === "/dashboard/settings"
                                ? "bg-emeraldGreen"
                                : ""
                        }`}
                    >
                        KYC
                    </Sidebar.Item>

                    <Sidebar.Item as={Link} to="#" icon={IoLogOut}>
                        <button onClick={handleLogout}>Logout</button>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default UserSidebar;
