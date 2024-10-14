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
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { IoClose } from "react-icons/io5";

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

    return (
        <Sidebar
            className={`bg-charcolGrey text-white fixed w-[64%] sm:w-[20%] h-full transition-transform transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 sm:block z-50`}
        >
            {/* Sidebar Header */}
            <div className="flex justify-between px-4 py-3 bg-lightGrey">
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
                </Sidebar.ItemGroup>
                {/* Group: Dashboard and others */}
                <Sidebar.ItemGroup>
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
                </Sidebar.ItemGroup>

                {/* Group: Transactions */}
                <Sidebar.ItemGroup>
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
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
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
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default UserSidebar;
