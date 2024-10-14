import { Button } from "@mui/material";
import { MdArrowCircleRight } from "react-icons/md";
import ManWomanSee from "../../../assets/images/ManWomanSea.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const GetStarted = () => {
    const navigate = useNavigate();

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);

    return (
        <div className="flex items-center justify-center p-4 py-16">
            <div className="flex flex-col sm:flex-row sm:space-x-6 p-5 space-y-6">
                <div
                    className="text-left w-full flex flex-col items-start justify-center space-y-4"
                    data-aos="fade-up" // Add AOS animation
                >
                    <h1 className="font-semibold text-6xl mb-3">
                        Let Us Work For You
                    </h1>
                    <p className="text-xl mb-5">
                        We help individuals, businesses, and institutions build,
                        preserve and manage wealth so they can pursue their
                        financial goals.
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            padding: "10px 20px",
                            borderRadius: 0,
                            bgcolor: "#264653",
                        }}
                        onClick={() => navigate("/auth/register")}
                    >
                        Start Membership
                        <MdArrowCircleRight />
                    </Button>
                </div>
                <div className="w-full h-full">
                    <img src={ManWomanSee} alt="" className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
