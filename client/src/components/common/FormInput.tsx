import React, { forwardRef } from "react";
import {
    TextField,
    OutlinedInput,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface FormInputProps {
    id: string;
    label: string;
    name: string;
    value: string | null;
    type?: string;
    onChange: any;
    showPassword?: boolean;
    onClickShowPassword?: () => void;
    onMouseDownPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUpPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            name,
            value,
            onChange,
            type = "text",
            showPassword,
            onClickShowPassword,
            onMouseDownPassword,
            onMouseUpPassword,
        },
        ref,
    ) => {
        return (
            <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "20px" }}
            >
                {type === "password" ? (
                    <>
                        <InputLabel htmlFor={id}>{label}</InputLabel>
                        <OutlinedInput
                            id={id}
                            name={name}
                            value={value || ""}
                            onChange={onChange}
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={onClickShowPassword}
                                        onMouseDown={onMouseDownPassword}
                                        onMouseUp={onMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={label}
                        />
                    </>
                ) : (
                    <TextField
                        id={id}
                        label={label}
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        inputRef={ref}
                    />
                )}
            </FormControl>
        );
    },
);

export default FormInput;
