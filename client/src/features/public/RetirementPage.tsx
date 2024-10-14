import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import RetiredManWoman from "../../assets/images/RetiredManWoman.jpg";

const RetirementPage = () => {
    const context = {
        title: "About Retirement",
        heading: "Start Now To Secure Your Future",
        content: [
            {
                content:
                    "This include the financial strategies of saving, investment, and ultimately distribution of money meant to sustain one's self during retirement.",
            },
            {
                content:
                    "The emphasis one puts on retirement planning changes throughout different life stages. Early in a person's working life, retirement planning is about setting aside enough money for retirement. During the middle of your career, it might also include setting specific income or asset targets and taking the steps to achieve them. Once you reach retirement age, you go from accumulating assets to what planners call the distribution phase. You’re no longer paying in; instead, your decades of saving with Algotrades are paying out.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Retirement"
                content="Start now to plan and save for your retirement. Algotrades has the best retirement plan."
            />

            <PageDescription context={context} image={RetiredManWoman} />

            <CompanyValue />
        </div>
    );
};

export default RetirementPage;
