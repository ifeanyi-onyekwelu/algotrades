import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import StaffWorkers from "../../assets/images/StaffWorkers.jpg";

const CareerPage = () => {
    const context = {
        title: "Work With Us",
        heading: "Become a Algotrades staff",
        content: [
            {
                content:
                    "At Algotrades, each of us is a captain of our spaceship and free to come up with new ideas to improve our journey. We’re empowered to make decisions for ourselves, for our team, and even for our leaders in order to innovate and build trust. Join us in our mission to give our customers greater choice, independence, and opportunity.",
            },
            {
                content:
                    "Submit your application through our site. If your skills appear to be a good match for the role, you’ll hear from us regarding next steps. If you don’t move forward in the process at this time, there are always other opportunities!",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Join Algotrades"
                content="Help us build the future by empowering everyday people to generate income and control their wealth"
            />

            <PageDescription context={context} image={StaffWorkers} />

            <CompanyValue />
        </div>
    );
};

export default CareerPage;
