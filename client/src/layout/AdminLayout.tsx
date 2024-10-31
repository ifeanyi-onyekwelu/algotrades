import { useState, useEffect } from "react";
import AdminSidebar from "../shared/admin/Sidebar";
import { NavBar } from "../shared/admin/Navbar";
import { Outlet } from "react-router-dom";
import { useAdminProfileQuery } from "../features/admin/api/adminApiSlice";
import { Component as UpdateProfitDrawer } from "../components/Admin/UpdateProfit";
import { useLocation } from "react-router-dom";

const AdminLayout = () => {
    // State for the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // State for the drawer (UpdateProfit component)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [currentPath, setCurrentPath] = useState("");

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === currentPath) return;
        else {
            setCurrentPath(pathname);
            setIsSidebarOpen(false);
        }
    }, [pathname]);

    const { data } = useAdminProfileQuery(undefined);
    const profileData = data?.user || {};

    return (
        <div className="flex">
            {/* Sidebar */}
            <AdminSidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div className="flex-1 flex flex-col w-[75%] sm:ml-[25%]">
                {/* Navbar */}
                <NavBar
                    toggleSidebar={toggleSidebar}
                    profileData={profileData}
                />

                <div className="px-4 py-3 bg-lightGrey">
                    {/* Drawer component */}
                    <UpdateProfitDrawer
                        isOpen={isDrawerOpen}
                        setIsOpen={setIsDrawerOpen}
                    />

                    {/* Button to open the drawer */}
                    <button
                        className=" text-white py-2 px-4 rounded block md:ml-auto ml-6 md:mr-6 bg-primary my-2"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        Update User Balance / Profit
                    </button>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
