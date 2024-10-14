import Breadcrumb from "../../components/Breadcrumb";
import CompanyValue from "../../components/common/CompanyValue";
import PageDescription from "../../components/common/PageDescription";
import TableHandshake from "../../assets/images/TeamTableHandshake.jpg";

const CompanyPage = () => {
    const context = {
        title: "about company",
        heading: "For a secure and planned future",
        content: [
            {
                content:
                    "Algotrades is one of the largest and most experienced international private equity firms. We have an established team of investment professionals, who are focused mainly on investment.",
            },
            {
                content:
                    "Algotrades is run by a team of trading experts who generate profits by buying and selling currencies, stocks, options and commodities on the foreign exchange market. We employ a variety of trading techniques to achieve the set goals for the client",
            },
            {
                content:
                    "Algotrades consists a team of financial market professionals assembled specifically in order to provide the best possible trading conditions to its customers. Our specialists have been involved in the development of technical specification for designing an up-to-date platform that is suitable for both beginners and experienced traders",
            },
            {
                content:
                    "As long as we have existed we have been trying to leverage lower risk and higher profits for our customers through innovative and insightful analysis, information dispersion, and expert assistance. Our team of professionals is composed of experienced and skilled experts and professionals, who bring a diverse and in depth knowledge to the entire investing process.",
            },
            {
                content:
                    "Our multi-asset investment approach is aimed at what matters helping you reach your desired outcomes. Portfolio management is the heart of what we do. From our current research studying the market, we are expecting to trigger a long term investment trading strategy which would give our new members guaranteed return on investment for the stipulated time.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Company Overview"
                content="We move, create opportunities and protect money for
                        customers and clients worldwide"
            />

            <PageDescription context={context} image={TableHandshake} />

            <CompanyValue />
        </div>
    );
};

export default CompanyPage;
