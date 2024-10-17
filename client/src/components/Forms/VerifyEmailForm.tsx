import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useVerifyEmailMutation } from "../../features/auth/api/authApiSlice.ts";
import FormInput from "../common/FormInput.tsx";
import AlertMessage from "../common/Snackbar.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";

interface FormState {
    token: string | null;
}

const LoginForm = () => {
    const [formState, setFormState] = useState<FormState>({
        token: "",
    });

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");

    const tokenRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyEmail(formState).unwrap();

            setSuccessMessage("Email verified successfully");
            setStatusType("success");
            setShowAlert(true);
            setFormState({ token: "" });

            setTimeout(() => {
                navigate("/dashboard/me");
            }, 3000);
        } catch (error: any) {
            setErrorMessage(error?.data?.message);
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (tokenRef.current) tokenRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [formState.token]);

    return (
        <form onSubmit={handleOnSubmit}>
            <FormInput
                id="token"
                label="Code"
                name="token"
                value={formState.token}
                onChange={handleOnChange}
                ref={tokenRef}
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: "#264653",
                    fontWeight: "bold",
                    padding: "10px 0",
                    fontSize: "16px",
                }}
                disabled={isLoading}
            >
                Verify
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

export default LoginForm;
