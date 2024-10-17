import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/slices/authSlice";
import { AppDispatch } from "../../app/store";
import Logo from "../../assets/images/logo.png";

import { FaRegUserCircle } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const UserNavbar = ({
    toggleSidebar,
    username,
    email,
}: {
    toggleSidebar: any;
    username: string;
    email: string;
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    return (
        <Navbar fluid>
            <Navbar.Brand className="flex items-center space-x-6 sm:space-x-6">
                <button
                    onClick={toggleSidebar}
                    className="text-black text-2xl sm:hidden mt-2"
                >
                    <FaBars />
                </button>
                <img src={Logo} alt="Logo" className="w-20 h-8 mt-2" />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm font-bold">
                            {username}
                        </span>
                        <span className="block text-sm">{email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item
                        as={Link}
                        to="/dashboard/kyc"
                        className="gap-2"
                    >
                        <FaRegUserCircle />
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/dashboard/activities"
                        className="gap-2"
                    >
                        <MdHistory />
                        History
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="gap-2">
                        <IoLogOut />
                        Logout
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </Navbar>
    );
};

export default UserNavbar;
