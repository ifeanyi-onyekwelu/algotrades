import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Styled components for enhanced styling
const StyledDialogContent = styled(DialogContent)(() => ({
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "500",
    marginBottom: "16px",
}));

const StyledButton = styled(Button)(() => ({
    backgroundColor: "#EFAE1B",
    color: "#000",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#d8a818",
    },
}));

const AlertModal = ({ errorMessage, showAlert, setShowAlert }: any) => {
    const handleClose = () => {
        setShowAlert(false);
    };

    return (
        <Dialog
            open={showAlert}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <StyledDialogContent onClick={(e) => e.stopPropagation()}>
                <StyledDialogContentText>
                    {errorMessage}
                </StyledDialogContentText>
            </StyledDialogContent>
            <DialogActions>
                <StyledButton onClick={handleClose}>Try Again</StyledButton>
            </DialogActions>
        </Dialog>
    );
};

export default AlertModal;
