import React, { ChangeEvent, useState, useEffect } from "react";
import {
    useReinvestMutation,
    useGetAllUserPlansQuery,
} from "../../features/user/api/userApiSlice.ts";
import { Button, FormControl, SelectChangeEvent } from "@mui/material";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import FormSelect from "../common/FormSelect.tsx";
import FormInput from "../common/FormInput.tsx";

interface FormState {
    source: string;
    plan: string;
    amount: string;
}

const ReinvestForm = () => {
    const [formState, setFormState] = useState<FormState>({
        source: "",
        plan: "",
        amount: "",
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [plansData, setPlansData] = useState<
        { value: string; title: string; amount: string }[]
    >([]);

    const { data: plans = {} } = useGetAllUserPlansQuery({});
    const [reinvest, { isLoading: isReinvestLoading }] = useReinvestMutation();

    useEffect(() => {
        // Populate plansData with initial investment amounts
        const formattedPlans = (plans.plans || []).map((plan: any) => ({
            value: plan._id,
            title: `Invest $${plan.initialInvestment} Get $${plan.profit} (Duration ${plan.duration} ${plan.durationType})`,
            amount: plan.initialInvestment, // Add the initial investment amount
        }));
        setPlansData(formattedPlans);
    }, [plans]);

    // Update amount based on the selected plan
    useEffect(() => {
        const selectedPlan = plansData.find(
            (plan) => plan.value === formState.plan,
        );
        if (selectedPlan) {
            setFormState((prevState) => ({
                ...prevState,
                amount: selectedPlan.amount, // Set amount to the selected plan's initial investment
            }));
        } else {
            setFormState((prevState) => ({
                ...prevState,
                amount: "", // Reset amount if no plan is selected
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
        try {
            await reinvest(formState).unwrap();
            setSuccessMessage(
                `You have successfully reinvested ${formState.amount}`,
            );
            setStatusType("success");
            setShowAlert(true);
            setFormState({ source: "", plan: "", amount: "" });
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    return (
        <form
            onSubmit={handleOnSubmit}
            className="w-full md:w-1/2 bg-white shadow-sm p-8 rounded-md"
        >
            <p className="text-sm mb-2">
                Reinvestments are quick deposits made from your account balance
                to renew your contract.
            </p>
            <FormControl fullWidth margin="normal">
                <FormSelect
                    label="source"
                    title="Source"
                    value={formState.source}
                    handleOnChange={handleOnChange}
                    menuItems={[
                        {
                            value: "balance",
                            title: "Reinvest from my balance",
                        },
                    ]}
                />
            </FormControl>
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
                    marginTop: "10px",
                }}
                disabled={isReinvestLoading}
            >
                Reinvest
            </Button>

            <AlertMessage
                errorMessage={errorMessage}
                successMessage={successMessage}
                statusType={statusType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <LoadingBackdrop open={isReinvestLoading} />
        </form>
    );
};

export default ReinvestForm;
