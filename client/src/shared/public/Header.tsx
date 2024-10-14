import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "../../assets/images/logo.png";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // Separate mobile dropdown state

    // Create refs for mobile menu and dropdown
    const mobileMenuRef = useRef<HTMLHeadElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsMobileDropdownOpen(false); // Close mobile dropdown when opening/closing the mobile menu
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileDropdown = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent propagation to avoid closing the menu
        setIsMobileDropdownOpen(!isMobileDropdownOpen);
    };

    const links = [
        { label: "Home", href: "/" },
        { label: "Company", href: "/about" },
        {
            label: "Services",
            href: "#",
            dropdown: true,
        },
        { label: "Plan", href: "/plans" },
    ];

    const dropDownLinks = [
        { label: "Real Estate", href: "/real-estate" },
        { label: "Career", href: "/career" },
        { label: "Cryptocurrency", href: "/cryptocurrency" },
        { label: "Forex", href: "/forex" },
        { label: "Gold", href: "/gold" },
        { label: "Agriculture", href: "/agriculture" },
        { label: "Retirement", href: "/retirement" },
        { label: "Stocks & EFTS", href: "/stocks" },
    ];

    // Close dropdown or mobile menu when clicking outside of them
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            // Check if the clicked element is outside the mobile menu
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target)
            ) {
                setIsMobileMenuOpen(false);
            }
            // Check if the clicked element is outside the dropdown
            if (
                isDropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        // Add event listener to listen for clicks outside
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen, isDropdownOpen]);

    return (
        <header
            className={`py-4 fixed w-full transition-all duration-300 shadow-sm backdrop-blur-2xl ${
                isScrolled ? "bg-lightGrey" : "bg-transparent"
            } z-20`}
        >
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <div className="flex items-center h-full">
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="sm:w-full sm:h-16 h-12"
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8 relative">
                    {links.map((link, index) => (
                        <div key={index} className="relative">
                            {link.dropdown ? (
                                <>
                                    <Link
                                        to="#"
                                        onClick={toggleDropdown}
                                        className={`flex items-center font-semibold text-lg ${
                                            isScrolled
                                                ? "text-primary"
                                                : "text-primary"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                    {isDropdownOpen && (
                                        <div
                                            ref={dropdownRef} // Attach the ref to the dropdown
                                            className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10"
                                        >
                                            {dropDownLinks.map(
                                                (dropdownLink) => (
                                                    <Link
                                                        key={dropdownLink.href}
                                                        to={dropdownLink.href}
                                                        className={`block px-4 py-2 hover:bg-primary hover:text-white ${
                                                            isScrolled
                                                                ? "text-primary"
                                                                : "text-primary"
                                                        }`}
                                                    >
                                                        {dropdownLink.label}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to={link.href}
                                    className={`flex items-center font-semibold text-lg ${
                                        isScrolled
                                            ? "text-primary"
                                            : "text-primary"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        to="/auth/login"
                        className="flex gap-4 items-center bg-primary p-3 rounded px-5 text-white hover:bg-secondary"
                    >
                        Login
                        <FaRegCircleUser />
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <Button
                        onClick={toggleMobileMenu}
                        sx={{
                            fontSize: "2rem",
                            color: "#fff",
                            bgcolor: "#264653",
                        }}
                    >
                        {isMobileMenuOpen ? (
                            <IoCloseOutline />
                        ) : (
                            <HiOutlineBars3 />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <nav
                    ref={mobileMenuRef} // Attach the ref to the mobile menu
                    className={`flex flex-col space-y-4 p-6 md:hidden text-primary bg-white bg-opacity-10 backdrop-blur-lg transition-opacity duration-300 ease-in-out`}
                >
                    {links.map((link, index) => (
                        <div key={index} className="relative">
                            {link.dropdown ? (
                                <>
                                    <Link
                                        to="#"
                                        onClick={toggleMobileDropdown}
                                        className={`flex items-center font-semibold text-lg ${
                                            isScrolled
                                                ? "text-primary"
                                                : "text-primary"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                    {isMobileDropdownOpen && (
                                        <div className="mt-2 w-full bg-white rounded-md shadow-lg z-10">
                                            {dropDownLinks.map(
                                                (dropdownLink) => (
                                                    <Link
                                                        key={dropdownLink.href}
                                                        to={dropdownLink.href}
                                                        className={`block px-4 py-2 hover:bg-primary hover:text-white ${
                                                            isScrolled
                                                                ? "text-primary"
                                                                : "text-primary"
                                                        }`}
                                                    >
                                                        {dropdownLink.label}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to={link.href}
                                    className={`flex items-center font-semibold text-lg ${
                                        isScrolled
                                            ? "text-primary"
                                            : "text-primary"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                    <Link
                        to="auth/login"
                        className="bg-primary px-4 py-2 rounded-sm hover:bg-secondary text-white font-semibold flex gap-3 items-center"
                    >
                        Login
                        <FaRegCircleUser />
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
