import { Link } from "react-router-dom";

const Footer = () => {
    const links = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "about" },
        { label: "Client Portal", href: "auth/login" },
        { label: "Start Membership", href: "auth/register" },
        { label: "Contact Us", href: "/contact" },
    ];

    const services = [
        { label: "Real Estate", href: "real-estate" },
        { label: "Retirement", href: "/retirement" },
        { label: "Cryptocurrency", href: "/cryptocurrency" },
        { label: "Stocks & EFTs", href: "/stocks" },
        { label: "Portfolio Management", href: "/portfolio-management" },
    ];

    const legalLinks = [
        { label: "Risk Disclosure", href: "about" },
        { label: "Anti Spam Policy", href: "about" },
        { label: "Anti Money Laundering", href: "about" },
        { label: "Placement of Statement", href: "about" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Use", href: "#" },
    ];

    return (
        <footer className="bg-secondary py-20 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Contact Info */}
                    <div className="border-r border-dashed pr-4 flex flex-col space-y-5">
                        <h1 className="text-lg md:text-2xl text-white font-extrabold">
                            ALGOTRADES LTD
                        </h1>
                        <p className="text-white">
                            Apartment 6 Paramount House, 168 Wardour Street,
                            London, W1F 8ZX, England
                        </p>
                        <p className="text-white">
                            <span className="font-semibold">
                                Registration Number:
                            </span>{" "}
                            14607237
                        </p>
                        <Link
                            to="mailto:homyreal@demo.com"
                            className="block mt-2 text-gray-200 hover:text-white"
                        >
                            support@algotrades.io
                        </Link>
                    </div>

                    {/* Links Section */}
                    <div className="border-r border-dashed pr-4">
                        <h3 className="text-lg font-bold text-white">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-200 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-r border-dashed">
                        <h3 className="text-lg font-bold text-white">
                            Services
                        </h3>
                        <ul className="mt-4 space-y-3 last:border-none">
                            {services.map((listing, index) => (
                                <li key={index}>
                                    <Link
                                        to={listing.href}
                                        className="text-gray-200 hover:text-white"
                                    >
                                        {listing.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="pr-4">
                        <h3 className="text-lg font-bold text-white">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-200 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="text-white text-sm">
                    How Algotrades calculates return on Investment, all return
                    figures shown above are actual and fixed, not for
                    illustrative purposes only. Before investing, consider your
                    investment objectives and Algotrades charges and expenses.
                    Algotrades internet-based services are designed to assist
                    clients in achieving discrete financial goals. They are
                    intended to provide comprehensive tax advice and financial
                    planning with respect to every aspect of a client's
                    financial situation and can incorporate specific investments
                    that clients hold elsewhere. Algotrades is available to
                    everyone Globally
                </p>

                <div className="flex sm:flex-row flex-col sm:justify-between justify-start py-6">
                    <p className="text-white mb-5 sm:mb-0">
                        Copyright &copy; Algotrades, All rights reserved
                    </p>

                    <ul className="flex sm:flex-row flex-col sm:space-x-5 space-y-6 sm:space-y-0 items-center">
                        <li>
                            <Link
                                to="#"
                                className="text-gray-200 hover:text-white"
                            >
                                Certificate of Incorporation
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-gray-200 hover:text-white"
                            >
                                Terms of Use
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="text-gray-200 hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
