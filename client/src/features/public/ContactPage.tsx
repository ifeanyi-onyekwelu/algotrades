import Breadcrumb from "../../components/Breadcrumb";
import { Divider } from "@mui/material";
import { MdLocationPin } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
    return (
        <div>
            <Breadcrumb
                label="Contact Us"
                content="Do you have any queries or suggestions? Please contact us about all enquiries including membership and volunteer work using the form below."
            />

            <div className="py-20 px-14">
                <div className="flex space-x-8 flex-col md:flex-row p-3">
                    <div className="flex flex-col space-y-4 p-3 w-full">
                        <h2 className="uppercase text-xl text-primary">
                            let's talk
                        </h2>
                        <h1 className="text-3xl font-bold">Get in Touch</h1>
                        <p className="text-lg">
                            Having troubles, suggestions or informations you
                            will like to share? Drop a message.
                        </p>
                        <Divider />
                        <div className="flex space-x-6 items-center">
                            <MdLocationPin className="w-12 h-12 rounded-full bg-secondary text-lightGrey p-3" />
                            <div className="flex flex-col ">
                                <h4 className="text-semibold">Head Office</h4>
                                <p>
                                    5 Roman Way Hanham, Bristol, United Kingdom.
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-6 items-center">
                            <FaEnvelope className="w-12 h-12 rounded-full bg-secondary text-lightGrey p-3" />
                            <div className="flex flex-col">
                                <h4 className="text-semibold">Email Us</h4>
                                <p>support@Algotrades.io</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center p-14 w-full">
                        <img
                            src="https://www.Algotrades.net/static/temp/wp-content/uploads/sites/56/2021/07/customer.jpg"
                            alt="Support Image"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
