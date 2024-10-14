import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface AlertMessageProps {
    errorMessage: string;
    successMessage: string;
    statusType: "error" | "success";
    showAlert: boolean;
    setShowAlert: (open: boolean) => void;
}

const AlertMessage = ({
    errorMessage,
    successMessage,
    statusType,
    showAlert,
    setShowAlert,
}: AlertMessageProps) => {
    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setShowAlert(false);
    };

    // Determine the message to display
    const message = statusType === "error" ? errorMessage : successMessage;

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                open={showAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={statusType} // "error" or "success" sets the color
                    sx={{
                        width: "100%",
                        bgcolor:
                            statusType === "error"
                                ? "error.main"
                                : "success.main",
                        color: "white",
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AlertMessage;
