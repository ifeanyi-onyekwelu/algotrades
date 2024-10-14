import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import Gold from "../../assets/images/gold.jpg";

const GoldPage = () => {
    const context = {
        title: "About Gold",
        heading: "Start Investing Comfortably In Gold",
        content: [
            {
                content:
                    "Of all the precious metals, gold is the most popular as an investment. Investors generally buy gold as a way of diversifying their portfolio, especially through the use of futures contracts and derivatives",
            },
            {
                content:
                    "The gold market is subject to speculation and volatility as are other markets. Compared to other precious metals used for investment, gold has been the most effective safe haven across a number of countries. Gold is a commodity that trades based on supply and demand. The interplay between supply and demand ultimately determines what the spot price of gold is at any given time. At Algorithmtrades.net we guide you through the whole investment process from a beginner to an expert level.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Gold"
                content="The technicals and intensive capital required to begin an investment in Gold is no longer necessary with Algorithmtrades.net."
            />

            <PageDescription context={context} image={Gold} />

            <CompanyValue />
        </div>
    );
};

export default GoldPage;
