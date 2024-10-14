import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AdminRegisterForm from "../../../components/Forms/AdminRegisterForm";

const RegisterPage = () => {
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
                    Register as Admin
                </Typography>
                <Typography
                    variant="body2"
                    textAlign="center"
                    mb={4}
                    color="textSecondary"
                >
                    Have an account?{" "}
                    <Link
                        to="/auth/admin/login"
                        className="text-primary underline"
                    >
                        Login
                    </Link>
                </Typography>

                <AdminRegisterForm />
            </Paper>
        </Box>
    );
};

export default RegisterPage;
