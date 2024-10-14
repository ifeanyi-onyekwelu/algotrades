import OurPurposeCard from "./OurPurposeCard";
import HandShake from "../../../../assets/images/handshake.jpg";
import TeamTable from "../../../../assets/images/TeamTable.jpg";
import PhoneTrading from "../../../../assets/images/PhoneTrading.jpg";
import CityBuildings from "../../../../assets/images/CityBuildings.jpg";

const OurPurposeList = () => {
    const itemsRow1 = [
        {
            image: HandShake,
            title: "Explore With Our Leadership Team",
            content:
                "Seize the opportunity to grow your capital in the cryptocurrency market by copying the trades of top performing traders in our investment programme",
        },
        {
            image: PhoneTrading,
            title: "High Frequency Trading With Our Leadership Team",
            content:
                "Global institutions, leading hedge funds and industry innovators turn to Algotrades for bitcoin cryptocurrency trading advice and market-making services.",
        },
    ];

    const itemsRow2 = [
        {
            image: TeamTable,
            title: "Investment Management",
            content:
                "We deliver active bitcoin investment strategies across public and private markets and custom solutions to institutional and individual investors.",
        },
        {
            image: CityBuildings,
            title: "Wealth Management",
            content:
                "We help people, businesses and institutions build, preserve and manage wealth so they can pursue their financial goals.",
        },
    ];

    return (
        <div className="flex flex-col md:flex-row md:p-2 md:space-x-3">
            <div className="flex space-y-3 flex-col">
                {itemsRow1.map((item1, index) => (
                    <div
                        key={index} // Always add a unique key for each mapped item
                        data-aos="fade-up" // Add fade-up effect
                        data-aos-delay={index * 200} // Incremental delay
                    >
                        <OurPurposeCard
                            title={item1.title}
                            content={item1.content}
                            image={item1.image}
                        />
                    </div>
                ))}
            </div>
            <div className="flex space-y-3 flex-col md:mt-8 mt-3">
                {itemsRow2.map((item2, index) => (
                    <div
                        key={index} // Always add a unique key for each mapped item
                        data-aos="fade-up" // Add fade-up effect
                        data-aos-delay={(itemsRow1.length + index) * 200} // Incremental delay
                    >
                        <OurPurposeCard
                            title={item2.title}
                            content={item2.content}
                            image={item2.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurPurposeList;
