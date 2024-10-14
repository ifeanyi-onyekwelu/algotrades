import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const PageDescription = ({ context, image }: any) => {
    const navigate = useNavigate();

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
        });
    }, []);

    return (
        <div className="py-6 px-4">
            <div className="flex md:flex-row flex-col sm:space-x-4 justify-between">
                <div className="flex flex-col space-y-6 w-full h-full p-3 sm:p-10">
                    <h2 className="uppercase text-primary" data-aos="fade-up">
                        {context.title}
                    </h2>
                    <h1
                        className="text-3xl sm:text-5xl font-semibold"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {context.heading}
                    </h1>
                    {context.content.map((content: any, index: number) => (
                        <p
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100 + 400}
                        >
                            {content.content}
                        </p>
                    ))}

                    <Button
                        sx={{
                            bgcolor: "#264653",
                            color: "#ffffff",
                            borderWidth: "2px",
                            fontWeight: "bold",
                            padding: "15px 20px",
                            "&:hover": {
                                bgcolor: "#111D29",
                                color: "#fff",
                            },
                        }}
                        onClick={() => navigate("/auth/register")}
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        Start Membership
                    </Button>
                </div>

                <div
                    className="w-full h-full flex items-center justify-center p-4"
                    data-aos="fade-up"
                    data-aos-delay="800"
                >
                    <img
                        src={image}
                        alt="Company Image"
                        className="sm:w-full w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default PageDescription;
