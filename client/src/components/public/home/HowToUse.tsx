import { ImUserPlus } from "react-icons/im";
import { FaChartPie } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";

export const HowToUse = () => {
    const items = [
        {
            icon: <ImUserPlus />,
            label: "Create account",
            content:
                "First you need to become a member of Algotrades by registering",
        },
        {
            icon: <FaChartPie />,
            label: "Choose Plan",
            content:
                "Select any of our unique financial earning plans that best works for you.",
        },
        {
            icon: <FaHandHoldingDollar />,
            label: "Passive Income",
            content:
                "Start earning passively and get paid immediately you request for a withdrawal.",
        },
    ];

    return (
        <div className="p-2 py-4 shadow-lg z-10 bg-white">
            <div className="container p-5 py-8 flex items-center m-auto">
                {/* Make the flex direction column on smaller screens and row on larger */}
                <div className="w-full flex flex-col md:flex-row sm:space-x-10 space-y-7 text-primary">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full space-x-4 justify-center px-5"
                            data-aos="fade-up" // Add fade-up effect
                            data-aos-delay={index * 200} // Add incremental delay (200ms per item)
                        >
                            <span className="text-5xl">{item.icon}</span>
                            <div className="flex flex-col justify-center space-y-2 w-full">
                                <h3 className="capitalize text-base md:text-lg m-0">
                                    {item.label}
                                </h3>
                                <p className="text-primary-600 text-sm md:text-md">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
