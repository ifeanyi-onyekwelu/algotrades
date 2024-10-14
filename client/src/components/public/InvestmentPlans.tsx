import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const InvestmentPlans = () => {
    const fiveDaysPlan = [
        { plan: "INVEST $1000 EARN $8,000" },
        { plan: "INVEST $2000 EARN $16,000" },
        { plan: "INVEST $3000 EARN $32,000" },
        { plan: "INVEST $5000 EARN $40,000" },
    ];
    const tenDaysPlan = [
        { plan: "INVEST $10,000 EARN $80,000" },
        { plan: "INVEST $20,000 EARN $160,000" },
        { plan: "INVEST $50,000 EARN $400,000" },
    ];
    const oneMonthPlan = [
        { plan: "INVEST $50,000 EARN $500,000" },
        { plan: "INVEST $80,000 EARN $800,000" },
        { plan: "INVEST $100,000 EARN $1,000,000" },
        { plan: "INVEST $200,000 EARN $2,000,000" },
    ];

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);

    return (
        <div className="md:values p-0 md:p-20">
            <div className="w-full flex flex-col space-y-7 text-center py-7 md:py-32 px-10 bg-primary opacity-80">
                <h2
                    className="text-sm uppercase text-white font-semibold"
                    data-aos="fade-up"
                >
                    Company Value
                </h2>
                <h1
                    className="text-white text-3xl md:text-5xl font-bold"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Our awesome investment plans
                </h1>
                <p
                    className="text-white text-sm md:text-md font-semibold"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    We focus on comprehensive financial advice and investment
                    services
                </p>
                <div className="flex flex-col md:flex-row md:space-x-8 p-3 space-y-2 md:space-y-0">
                    <div
                        className="w-full p-5 bg-white text-primary opacity-100"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <h2 className="text-xl md:text-4xl mb-5 font-bold">
                            5 Days Plan
                        </h2>
                        <ul className="flex flex-col space-y-1">
                            {fiveDaysPlan.map((plan, index) => (
                                <li
                                    className="text-sm md:text-md font-semibold"
                                    key={plan.plan}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100 + 700} // Staggered delay
                                >
                                    {plan.plan}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="w-full p-5 bg-white text-primary opacity-100"
                        data-aos="fade-up"
                        data-aos-delay="900"
                    >
                        <h2 className="text-xl md:text-4xl mb-5 font-bold">
                            10 Days Plan
                        </h2>
                        <ul className="flex flex-col space-y-1">
                            {tenDaysPlan.map((plan, index) => (
                                <li
                                    className="text-sm md:text-md font-semibold"
                                    key={plan.plan}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100 + 1000} // Staggered delay
                                >
                                    {plan.plan}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="w-full p-5 bg-white text-primary opacity-100"
                        data-aos="fade-up"
                        data-aos-delay="1200"
                    >
                        <h2 className="text-xl md:text-4xl mb-5 font-bold">
                            Real Estate Plan (1 Month)
                        </h2>
                        <ul className="flex flex-col space-y-1">
                            {oneMonthPlan.map((plan, index) => (
                                <li
                                    className="text-sm md:text-md font-semibold"
                                    key={plan.plan}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100 + 1300} // Staggered delay
                                >
                                    {plan.plan}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPlans;
