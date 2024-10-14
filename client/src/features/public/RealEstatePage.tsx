import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import SkyBuilding from "../../assets/images/SkyPicture.jpg";

const RealEstatePage = () => {
    const context = {
        title: "About Real Estate",
        heading: "Create Passive Income Through Real Estate",
        content: [
            {
                content:
                    "Real estate investing involves the purchase, ownership, management, rental and/or sale of real estate for profit.",
            },
            {
                content:
                    "Real estate is an asset form with liquidity relative to other investments, it is also capital intensive and is highly cash flow dependent. If these factors are not well understood and managed by the investor, real estate becomes a risky investment. This is why investing with Algotrades is the best option, we don't only make real estate investment cost effective, every risk involved is also curtailed leaving you with guaranteed profits.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Real Estate"
                content="You can now invest in real estate and own physical properties with Algotrades"
            />

            <PageDescription context={context} image={SkyBuilding} />

            <CompanyValue />
        </div>
    );
};

export default RealEstatePage;
