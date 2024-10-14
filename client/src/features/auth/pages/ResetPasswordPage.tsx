import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ResetPasswordForm from "../../../components/Forms/ResetPasswordForm";

const ResetPasswordPage = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 20px",
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
                    Never Mind?
                    <Link
                        to="/auth/register"
                        className="text-primary underline"
                    >
                        Register
                    </Link>
                </Typography>

                <ResetPasswordForm />
            </Paper>
        </Box>
    );
};

export default ResetPasswordPage;
