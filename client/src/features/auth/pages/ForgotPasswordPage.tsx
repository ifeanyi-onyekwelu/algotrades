import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../api/authApiSlice.ts";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LoadingBackdrop } from "../../../components/LoadingBackdrop.tsx";
import { Box, Paper, Typography } from "@mui/material";

interface FormState {
    emailOrUsername: string | null;
}

const ForgotPasswordPage: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        emailOrUsername: null,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    const emailOrUsernameRef = useRef<HTMLInputElement>(null);

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await forgotPassword(formState).unwrap();
            console.log(`RESPONSE: ${response}`);
        } catch (error: any) {
            console.error(`ERROR: ${error}`);
            // Set error message or handle error case here
            setErrorMessage(error?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        if (emailOrUsernameRef.current) emailOrUsernameRef.current.focus();
    }, []);

    useEffect(() => {
        if (errorRef.current) errorRef.current.focus();
    }, [errorMessage]);

    useEffect(() => {
        setErrorMessage(null); // Clear error message when form fields change
    }, [formState.emailOrUsername]);

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
                    Never mind?{" "}
                    <Link to="/auth/login" style={{ color: "#EFAE1B" }}>
                        Login
                    </Link>
                </Typography>

                <form onSubmit={handleOnSubmit}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: "20px" }}
                    >
                        <TextField
                            id="emailOrUsername"
                            label="Email or Username"
                            name="emailOrUsername"
                            value={formState.emailOrUsername}
                            onChange={handleOnChange}
                            inputRef={emailOrUsernameRef}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>

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
                        Forgot my password
                    </Button>
                </form>
            </Paper>

            <LoadingBackdrop open={isLoading} />
        </Box>
    );
};

export default ForgotPasswordPage;
