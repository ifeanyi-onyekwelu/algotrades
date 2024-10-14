import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "../../../components/Forms/LoginForm";

const LoginPage = () => {
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
                    Welcome back Admin
                </Typography>

                <LoginForm />
            </Paper>
        </Box>
    );
};

export default LoginPage;
