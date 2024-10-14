import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import InvestmentPlans from "../../components/public/InvestmentPlans";
import Charts from "../../assets/images/Charts.jpg";

const PlansPage = () => {
    const context = {
        title: "The best, and flexible investment plan.",
        heading: "Create Passive Income Through Algotrades",
        content: [
            {
                content:
                    "Algotrades investment plans offers flexibility, fair profit investment plans, and a 3% bonus for any referrals.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Investment Plans"
                content="Our awesome investment plans"
            />

            <PageDescription context={context} image={Charts} />

            <InvestmentPlans />
        </div>
    );
};

export default PlansPage;
