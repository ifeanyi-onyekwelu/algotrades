import Breadcrumb from "../../components/Breadcrumb";
import PageDescription from "../../components/common/PageDescription";
import CompanyValue from "../../components/common/CompanyValue";
import Forex from "../../assets/images/forex.jpg";

const ForexPage = () => {
    const context = {
        title: "About Foreign Exchange",
        heading: "Invest In The Forex Market The Right Way",
        content: [
            {
                content:
                    "Forex is one of those areas that most people feel is complicated. In reality, it's like many other forms of investment where a little knowledge can be dangerous. The good news for people out there looking to invest in forex is that we at Algorithmtrades are here to help.",
            },
            {
                content:
                    "We have a group of experienced traders and market analysts. After years of professional trading we have joined our skills, knowledge and talents in the effort to bring a new reliable investment opportunity. As the result of careful planning and joint work emerged Forex Investment, a reliable long-term investment project, that offers great returns along with professional approach and security.",
            },
        ],
    };
    return (
        <div>
            <Breadcrumb
                label="Foreign Exchange"
                content="Our Experts covers you in all complex aspects of the forex market. You need not worry about anything."
            />

            <PageDescription context={context} image={Forex} />

            <CompanyValue />
        </div>
    );
};

export default ForexPage;
