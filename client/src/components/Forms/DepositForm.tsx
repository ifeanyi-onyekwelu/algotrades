import React, { useState, ChangeEvent, useEffect } from "react"; // Import useEffect
import {
    useHandleUserDepositMutation,
    useGetAllUserPlansQuery,
} from "../../features/user/api/userApiSlice.ts";
import {
    Button,
    FormControl,
    SelectChangeEvent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
} from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormSelect from "../common/FormSelect.tsx";
import FormInput from "../common/FormInput.tsx";
import { Box, Typography } from "@mui/material";

interface FormState {
    plan: string;
    currency: string;
    cryptocurrency: string;
    amount: string;
}

const DepositForm = () => {
    const [formState, setFormState] = useState<FormState>({
        plan: "",
        currency: "",
        cryptocurrency: "",
        amount: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false); // For the dialog
    const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false); // Loading state for confirm button

    const [deposit, { isLoading: isDepositLoading }] =
        useHandleUserDepositMutation();
    const { data: plans = {} } = useGetAllUserPlansQuery({});

    const plansData = (plans.plans || []).map((plan: any) => ({
        value: plan._id,
        title: `Invest $${plan.initialInvestment} Get $${plan.profit} (Duration ${plan.duration} ${plan.durationType})`,
        amount: plan.initialInvestment, // Add the initial investment amount
    }));

    // Update the amount field whenever the plan changes
    useEffect(() => {
        const selectedPlan = plansData.find(
            (plan: any) => plan.value === formState.plan,
        );
        if (selectedPlan) {
            setFormState((prevState) => ({
                ...prevState,
                amount: selectedPlan.amount, // Set amount to the selected plan's initial investment
            }));
        }
    }, [formState.plan, plansData]);

    const handleOnChange = (
        e: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validation check for required fields
        const { plan, currency, cryptocurrency, amount } = formState;

        if (!plan || !currency || !cryptocurrency || !amount) {
            setErrorMessage("Please fill in all fields before submitting.");
            setStatusType("error");
            setShowAlert(true);
            return;
        }

        try {
            setOpenDialog(true); // Open the dialog after a successful deposit submission
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmDeposit = async () => {
        setIsConfirmLoading(true); // Set loading state
        try {
            await deposit({
                ...formState,
            }).unwrap();
            setSuccessMessage("Deposit successfully confirmed.");
            setStatusType("success");
            setOpenDialog(false);
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(
                error?.data?.message || "An error occurred. Please try again.",
            );
            setStatusType("error");
            setShowAlert(true);
        } finally {
            setIsConfirmLoading(false); // Reset loading state
        }
    };

    // Define deposit details based on cryptocurrency selection
    const depositDetails: Record<
        string,
        { address: string; qrCodeUrl: string }
    > = {
        BTC: {
            address: "0x3988461552b25b97536934F50f97942Ff8EF01A4",
            qrCodeUrl:
                "https://res.cloudinary.com/dr2z4ackb/image/upload/v1729250031/q9whz7vpaqzxtopjciuo.jpg",
        },
        USDT: {
            address: "TFhrFMXEWCdS5hwmpHR8S8EuHbrDuqaGmC",
            qrCodeUrl:
                "https://res.cloudinary.com/dr2z4ackb/image/upload/v1729022325/ud4hhgmjtxvk8wmczn0e.jpg",
        },
    };

    const selectedCrypto = formState.cryptocurrency;

    return (
        <form onSubmit={handleOnSubmit} className="w-full md:w-1/2">
            <FormControl fullWidth margin="normal">
                <FormSelect
                    label="plan"
                    title="Select Plan"
                    value={formState.plan}
                    handleOnChange={handleOnChange}
                    menuItems={plansData}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <FormSelect
                    label="cryptocurrency"
                    title="Select Cryptocurrency"
                    value={formState.cryptocurrency}
                    handleOnChange={handleOnChange}
                    menuItems={[
                        { value: "BTC", title: "Bitcoin (BTC)" },
                        { value: "USDT", title: "Tether (USDT)" },
                    ]}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <FormSelect
                    label="currency"
                    title="Select Currency"
                    value={formState.currency}
                    handleOnChange={handleOnChange}
                    menuItems={[{ value: "USD", title: "USD" }]}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <FormInput
                    id="amount"
                    label="Amount"
                    name="amount"
                    value={formState.amount}
                    onChange={handleOnChange}
                />
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: "#2D6A4F",
                    fontWeight: "bold",
                    padding: "8px 25px",
                    fontSize: "16px",
                    marginTop: "20px",
                }}
                disabled={isDepositLoading}
            >
                Submit
            </Button>

            {/* Dialog for the selected cryptocurrency details */}
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    Complete Your {selectedCrypto} Deposit
                </DialogTitle>

                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{ textAlign: "center", marginBottom: 3 }}
                    >
                        Please send the specified amount to the following
                        address:
                    </DialogContentText>

                    {selectedCrypto && depositDetails[selectedCrypto] && (
                        <Box
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 2,
                                padding: 2,
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                textAlign: "center",
                                marginBottom: 2,
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                {selectedCrypto} Address:
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    wordBreak: "break-word",
                                    marginBottom: 2,
                                }}
                            >
                                {depositDetails[selectedCrypto].address}
                            </Typography>
                            <img
                                src={depositDetails[selectedCrypto].qrCodeUrl}
                                alt={`${selectedCrypto} QR Code`}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", padding: 3 }}>
                    <Button
                        onClick={handleDialogClose}
                        sx={{
                            fontWeight: "bold",
                            color: "#6c757d",
                            marginRight: 2,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDeposit}
                        variant="contained"
                        sx={{
                            backgroundColor: "#28a745",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            "&:hover": { backgroundColor: "#218838" },
                        }}
                        disabled={isConfirmLoading} // Disable button while loading
                    >
                        {isConfirmLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Confirm Deposit"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />

            <LoadingBackdrop open={isConfirmLoading} />
        </form>
    );
};

export default DepositForm;
