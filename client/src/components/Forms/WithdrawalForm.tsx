import React, { ChangeEvent, useState } from "react";
import { useHandleUserWithdrawalMutation } from "../../features/user/api/userApiSlice";
import { Button, FormControl, SelectChangeEvent } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormSelect from "../common/FormSelect.tsx";
import FormInput from "../common/FormInput.tsx";

interface FormState {
    currency: string;
    source: string;
    amount: string;
}

const WithdrawalForm = () => {
    const [formState, setFormState] = useState<FormState>({
        currency: "",
        source: "",
        amount: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, __] = useState<string>("");
    const [statusType, _] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [withdraw, { isLoading }] = useHandleUserWithdrawalMutation();

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
        try {
            const response = await withdraw(formState).unwrap();
            console.log(response);
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error?.data?.message || "An error occurred");
            setShowAlert(true);
        }
    };

    return (
        <form
            onSubmit={handleOnSubmit}
            className="w-full md:w-1/2 bg-white shadow-sm p-8 rounded-md"
        >
            <p className="text-sm font-semibold mb-2">
                Withdrawals via USDT are automated. This is a blockchain-based
                transaction and expected to be completed within 10 minutes.
            </p>

            <FormControl fullWidth margin="normal">
                <FormSelect
                    label="currency"
                    title="Select preferred currency"
                    value={formState.currency}
                    handleOnChange={handleOnChange}
                    menuItems={[
                        {
                            value: "USD Tether TRC20 (USDTTRC20)",
                            title: "USD Tether TRC20 (USDTTRC20)",
                        },
                        {
                            value: "USD Tether ERC20 (USDTERC20)",
                            title: "USD Tether ERC20 (USDTERC20)",
                        },
                    ]}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <FormSelect
                    label="source"
                    title="Select withdrawal source"
                    value={formState.source}
                    handleOnChange={handleOnChange}
                    menuItems={[
                        { value: "balance", title: "Withdraw from balance" },
                        { value: "profit", title: "Withdraw from profit" },
                    ]}
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
                disabled={isLoading}
            >
                Withdraw
            </Button>
            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <LoadingBackdrop open={isLoading} />
        </form>
    );
};

export default WithdrawalForm;
