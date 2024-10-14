import Button from "@mui/material/Button";
import HeroBg from "../../../assets/images/heroBg.jpg";
import { useNavigate } from "react-router-dom";
export default function Hero() {
    const navigate = useNavigate();

    return (
        <div
            className="relative py-24 md:py-48"
            style={{
                background: `url(${HeroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
            }}
        >
            <div className="md:container w-full">
                <div className="flex-1 justify-center space-y-6 lg:space-y-8 w-full sm:w-3/4 mt-6 sm:mt-24 p-10">
                    <h1
                        className="text-white font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight w-full sm:w-1/2 uppercase"
                        data-aos="fade-up"
                    >
                        Build with Algotrades
                    </h1>
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
                        data-aos="fade-up"
                        onClick={() => navigate("/auth/register")}
                    >
                        Start Membership
                    </Button>
                </div>
            </div>
        </div>
    );
}
