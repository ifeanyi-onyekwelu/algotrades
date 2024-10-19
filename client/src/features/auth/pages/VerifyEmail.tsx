import { Box, Paper, Typography } from "@mui/material";
import VerifyEmailForm from "../../../components/Forms/VerifyEmailForm";

const VerifyEmail = () => {
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
                    Verify your email
                </Typography>

                <Typography sx={{ textAlign: "center" }}>
                    Enter the code that was sent to your mailbox
                </Typography>

                <VerifyEmailForm />
            </Paper>
        </Box>
    );
};

export default VerifyEmail;
