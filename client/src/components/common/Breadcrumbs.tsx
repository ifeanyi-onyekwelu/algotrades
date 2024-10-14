import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export default function Breadcrumb({ dashboardUrl, currentPage }: any) {
    return (
        <div className="w-full bg-gray-50 p-4 rounded-md shadow-md mb-10">
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    backgroundColor: "#f7f9fc",
                    borderRadius: "8px",
                }}
            >
                <Link
                    to={dashboardUrl || "/dashboard/me"}
                    className="flex items-center font-semibold hover:underline"
                    style={{
                        color: "#2D6A4F",
                        textDecoration: "none",
                        marginRight: "8px",
                    }}
                >
                    <HomeIcon
                        className="text-lg"
                        style={{ marginRight: "4px", color: "#2D6A4F" }}
                    />
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                        Dashboard
                    </Typography>
                </Link>
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.primary",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        fontWeight: 500,
                    }}
                >
                    {currentPage}
                </Typography>
            </Breadcrumbs>
        </div>
    );
}
