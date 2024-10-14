import { useState, useEffect } from "react";
import Sidebar from "../shared/user/Sidebar";
import Navbar from "../shared/user/Navbar";
import { Outlet } from "react-router-dom";
import { useGetUserProfileQuery } from "../features/user/api/userApiSlice";
import { useLocation } from "react-router-dom";

const UserLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    const { pathname } = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (pathname === currentPath) return;
        else {
            setCurrentPath(pathname);
            setIsOpen(false);
        }
    }, [pathname]);

    const { data } = useGetUserProfileQuery({});
    const profileData = data?.user || {};

    return (
        <div className="flex bg-lightGrey">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col w-full md:w-[80%] sm:ml-[20%]">
                <Navbar
                    toggleSidebar={toggleSidebar}
                    username={profileData?.username}
                    email={profileData?.email}
                />
                <div className="px-1 md:px-4">
                    <Outlet context={profileData} />{" "}
                    {/* Pass profileData to Outlet */}
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
