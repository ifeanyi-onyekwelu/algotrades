import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const CompanyValue = () => {
    const items = [
        {
            title: "Vision",
            content:
                "In a fast-moving and increasingly complex global economy, our success depends on how faithfully we adhere to our core principles: delivering exceptional client service and acting with integrity.",
        },
        {
            title: "Mission",
            content:
                "Our mission is to generate world-class investment returns over the long term. We aspire to do so in a way that makes our partners and portfolio companies proud, as we build a unique, global company.",
        },
        {
            title: "Guarantee",
            content:
                "We are here because we are passionate about open, transparent markets and aim to be a major driving force in widespread adoption, we are the first and the best in investment management.",
        },
    ];

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);

    return (
        <div className="sm:values md:p-20">
            <div className="w-full flex flex-col space-y-7 text-center py-14 sm:py-32 px-10 bg-primary opacity-80">
                <h2
                    className="text-sm uppercase text-white font-semibold"
                    data-aos="fade-up"
                >
                    Company Value
                </h2>
                <h1
                    className="text-white sm:text-5xl text-4xl font-bold"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Its all about your Future
                </h1>
                <p
                    className="text-white text-lg font-medium"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    We focus on comprehensive financial advice and investment
                    services
                </p>
                <div className="flex flex-col md:flex-row sm:space-x-8 p-3 space-y-5 md:space-y-0 w-full items-center">
                    {items.map((item, index) => (
                        <div
                            className="w-full p-5 bg-white text-primary opacity-100"
                            key={item.title}
                            data-aos="fade-up"
                            data-aos-delay={index * 200 + 600} // Staggered delay
                        >
                            <h4 className="font-semibold text-2xl">
                                {item.title}
                            </h4>
                            <p className="text-md">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyValue;
