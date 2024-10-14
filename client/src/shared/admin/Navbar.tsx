import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/slices/authSlice";
import { AppDispatch } from "../../app/store";
import { FaBars } from "react-icons/fa";

export function NavBar({ profileData, toggleSidebar }: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/auth/admin/login");
    };

    return (
        <Navbar fluid>
            <Navbar.Brand className="flex items-center space-x-2 sm:space-x-0">
                <button
                    onClick={toggleSidebar}
                    className="text-black text-2xl sm:hidden mt-2"
                >
                    <FaBars />
                </button>
                <h3 className="text-xl font-normal mt-3">
                    Welcome back, Admin
                </h3>
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
                        <span className="block text-sm">
                            {profileData.fullName}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {profileData.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item as={Link} to="/admin/">
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/">
                        View Site
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </Navbar>
    );
}
