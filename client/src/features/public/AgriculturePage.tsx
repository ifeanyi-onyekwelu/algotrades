import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import Stocks from "../../assets/images/stocks.jpg";

const AgriculturePage = () => {
    const context = {
        title: "About Agriculture",
        heading: "Agricultural Investment",
        content: [
            {
                content:
                    "An agricultural fund is a type of investment fund and agricultural product that is traded in exchange for money",
            },
            {
                content:
                    "Agricultural fund are similar in many ways to mutual funds. agricultural fund are created by large money managers which bundle the underlying instruments of the fund together. After a series of regulatory steps, an agricultural fund can be offered for sale to the public and can be purchased through Algorithmtrades.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Agricultural Investments"
                content="Algorithmtrades is here to guide you through your investment while yielding returns."
            />

            <PageDescription context={context} image={Stocks} />

            <CompanyValue />
        </div>
    );
};

export default AgriculturePage;
