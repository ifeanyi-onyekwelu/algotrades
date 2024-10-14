import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "../../../components/Forms/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 20px",
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    padding: "40px",
                    width: "100%",
                    maxWidth: "400px",
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
                    New here?{" "}
                    <Link
                        to="/auth/register"
                        className="text-primary underline"
                    >
                        Register
                    </Link>
                </Typography>

                <LoginForm />
            </Paper>
        </Box>
    );
};

export default LoginPage;
