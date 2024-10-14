import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import TradingLaptop from "../../assets/images/TradingLaptop.jpg";

const CryptocurrencyPage = () => {
    const context = {
        title: "About Cryptocurrency",
        heading: "Start Your Cryptocurrency Investment Journey",
        content: [
            {
                content:
                    "A cryptocurrency is a digital asset designed to work as a medium of exchange wherein individual coin ownership records are stored in a ledger existing in a form of computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership.",
            },
            {
                content:
                    "Cryptocurrency investment doesn't depend on your country or geography, it doesn't matter where you are. So feel free to invest in these cryptocurrencies with Algotrades. There are so many cryptocurrencies available to invest in, you do not need to bother about that aspect. We do the hard part while returning daily profits to you based on your investment portfolio.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Cryptocurrency"
                content="As difficult as it may seem. We make investing in cryptocurrency as easy as possible even to a beginner"
            />

            <PageDescription context={context} image={TradingLaptop} />

            <CompanyValue />
        </div>
    );
};

export default CryptocurrencyPage;
