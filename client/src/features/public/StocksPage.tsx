import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import Stocks from "../../assets/images/stocks.jpg";

const StocksPage = () => {
    const context = {
        title: "Stocks & ETFs Investment",
        heading: "Stocks & ETFs Investment",
        content: [
            {
                content:
                    "An exchange-traded fund is a type of investment fund and exchange-traded product that is traded on stock exchanges.",
            },
            {
                content:
                    "ETFs are similar in many ways to mutual funds, except that ETFs are bought and sold throughout the day on stock exchanges. ETFs are created by large money managers which bundle the underlying instruments of the fund together. After a series of regulatory steps, an ETF can be offered for sale to the public and can be purchased through Algorithmtrades.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Stocks & ETFs"
                content="Algorithmtrades is here to guide you through your investment while yielding returns."
            />

            <PageDescription context={context} image={Stocks} />

            <CompanyValue />
        </div>
    );
};

export default StocksPage;
