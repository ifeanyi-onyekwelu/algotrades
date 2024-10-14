import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, FormControlLabel, Checkbox } from "@mui/material";
import FormInput from "../common/FormInput.tsx";
import { LoadingBackdrop } from "../LoadingBackdrop.tsx";
import { useResetPasswordMutation } from "../../features/auth/api/authApiSlice.ts";

interface FormState {
    newPassword: string | null;
    confirmPassword: string | null;
}

const ResetPasswordForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        newPassword: null,
        confirmPassword: null,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const errorRef = useRef<HTMLDivElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formState.newPassword !== formState.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const response = await resetPassword(formState).unwrap();
            console.log(`RESPONSE: ${response}`);
            navigate("/auth/login");
        } catch (error: any) {
            console.error(`ERROR: ${error}`);
            setErrorMessage(error?.data?.message || "Failed to reset password");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (newPasswordRef.current) newPasswordRef.current.focus();
    }, []);

    useEffect(() => {
        if (errorRef.current) errorRef.current.focus();
    }, [errorMessage]);

    useEffect(() => {
        setErrorMessage(null);
    }, [formState.newPassword, formState.confirmPassword]);

    return (
        <form onSubmit={handleOnSubmit}>
            <FormInput
                id="newPassword"
                label="New Password"
                name="newPassword"
                value={formState.newPassword}
                onChange={handleOnChange}
                type="password"
                showPassword={showPassword}
                onClickShowPassword={handleClickShowPassword}
                onMouseDownPassword={handleMouseDownPassword}
                onMouseUpPassword={handleMouseUpPassword}
            />

            <FormInput
                id="confirmPassword"
                label="ConfirmPassword"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleOnChange}
                type="password"
                showPassword={showPassword}
                onClickShowPassword={handleClickShowPassword}
                onMouseDownPassword={handleMouseDownPassword}
                onMouseUpPassword={handleMouseUpPassword}
            />

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                <Link
                    to="/auth/forgot-password"
                    style={{ color: "#3f51b5", textDecoration: "none" }}
                >
                    Forgot Password?
                </Link>
            </Box>

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
                Set my password
            </Button>

            <LoadingBackdrop open={isLoading} />
        </form>
    );
};

export default ResetPasswordForm;
