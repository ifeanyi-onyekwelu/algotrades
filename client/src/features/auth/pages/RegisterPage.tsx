import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { LoadingBackdrop } from "../../../components/LoadingBackdrop";
import RegisterForm from "../../../components/Forms/RegisterForm";
import { useLocation } from "react-router-dom";

const RegisterPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const refToken = searchParams.get("ref");

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 16px",
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    padding: "32px",
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "10px",
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    mb={2}
                    fontWeight="bold"
                >
                    Welcome to{" "}
                    <Link to="/" className="text-primary font-black">
                        Algotrades
                    </Link>
                </Typography>
                <Typography
                    variant="body2"
                    textAlign="center"
                    mb={4}
                    color="textSecondary"
                >
                    Have an account?{" "}
                    <Link to="/auth/login" className="text-primary underline">
                        Login
                    </Link>
                </Typography>

                <RegisterForm refToken={refToken} />
            </Paper>
        </Box>
    );
};

export default RegisterPage;
