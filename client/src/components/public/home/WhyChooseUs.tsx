import { FaShieldAlt, FaPen, FaLock, FaChartBar } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <section className="bg-blue-50 py-12 sm:py-32">
            {/* Section Title */}
            <div className="text-center mb-10 p-4">
                <h2 className="text-md text-gray-500 uppercase tracking-wide mb-4">
                    Why Choose Us
                </h2>
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
                    There's never been a better time to build.
                </h1>
                <p className="mt-2 text-gray-600">
                    For years, we've pinpointed the trends shaping our global
                    economy to invest in industry-leading markets.
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {/* Feature 1 */}
                <div
                    data-aos="fade-up" // Add AOS animation
                    data-aos-delay="100" // Optional delay
                    className="text-center p-4 sm:p-0"
                >
                    <div className="flex justify-center items-center mb-4">
                        <div className="bg-white p-8 rounded-full">
                            <FaShieldAlt className="text-primary text-4xl" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Security & Privacy
                    </h3>
                    <p className="mt-2 text-gray-600">
                        We use the latest technology to protect your information
                        and financial transactions.
                    </p>
                </div>

                {/* Feature 2 */}
                <div
                    data-aos="fade-up" // Add AOS animation
                    data-aos-delay="200" // Optional delay
                    className="text-center p-4 sm:p-0"
                >
                    <div className="flex justify-center items-center mb-4">
                        <div className="bg-white p-8 rounded-full">
                            <FaPen className="text-primary text-4xl" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Investing Tools
                    </h3>
                    <p className="mt-2 text-gray-600">
                        From strategy to analysis, our tools help you keep track
                        of your finances with ease.
                    </p>
                </div>

                {/* Feature 3 */}
                <div
                    data-aos="fade-up" // Add AOS animation
                    data-aos-delay="300" // Optional delay
                    className="text-center p-4 sm:p-0"
                >
                    <div className="flex justify-center items-center mb-4">
                        <div className="bg-white p-8 rounded-full">
                            <FaLock className="text-primary text-4xl" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Asset Protection
                    </h3>
                    <p className="mt-2 text-gray-600">
                        We also participate in asset protection programs to
                        further secure your funds.
                    </p>
                </div>

                {/* Feature 4 */}
                <div
                    data-aos="fade-up" // Add AOS animation
                    data-aos-delay="400" // Optional delay
                    className="text-center p-4 sm:p-0"
                >
                    <div className="flex justify-center items-center mb-4">
                        <div className="bg-white p-8 rounded-full">
                            <FaChartBar className="text-primary text-4xl" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Investment Access
                    </h3>
                    <p className="mt-2 text-gray-600">
                        We are providing investors access to investments
                        previously available to the top 1%.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
