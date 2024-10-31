import { Drawer, Button } from "flowbite-react";
import { GiProfit } from "react-icons/gi";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useUpdateUserProfitMutation } from "../../features/admin/api/adminApiSlice";
import AlertMessage from "../common/Snackbar";
import { LoadingBackdrop } from "../LoadingBackdrop";

export function Component({ isOpen, setIsOpen }: any) {
    const handleClose = () => setIsOpen(false);

    const [username, setUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [operationType, setOperationType] = useState<"add" | "remove">("add");
    const [updateField, setUpdateField] = useState<"balance" | "profit">(
        "profit",
    );

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [updateUserProfit, { isLoading }] = useUpdateUserProfitMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(updateField);

        try {
            const response = await updateUserProfit({
                username,
                amount,
                operationType,
                updateField,
            });

            console.log(response);
            setSuccessMessage(
                `${updateField.charAt(0).toUpperCase() + updateField.slice(1)} ${operationType === "add" ? "added" : "removed"} successfully for ${username}!`,
            );
            setStatusType("success");
            setShowAlert(true);
            setUsername("");
            setAmount("");
            setOperationType("add");
            setUpdateField("profit");
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error);
            setStatusType("error");
            console.error("Failed to update:", error);
        }
    };

    return (
        <Drawer open={isOpen} onClose={handleClose} className="z-50">
            <Drawer.Header
                title="UPDATE USER BALANCE OR PROFIT"
                titleIcon={GiProfit}
            />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    {/* Username Input */}
                    <div className="mb-6 mt-3">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                required
                                id="username"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">
                                Amount
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormControl>
                    </div>

                    {/* Field Type Selection */}
                    <div className="mb-6">
                        <FormControl component="fieldset">
                            <div className="flex items-center">
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        value="profit"
                                        name="updateField"
                                        checked={updateField === "profit"}
                                        onChange={() =>
                                            setUpdateField("profit")
                                        }
                                    />
                                    Update Profit
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="balance"
                                        name="updateField"
                                        checked={updateField === "balance"}
                                        onChange={() => {
                                            setUpdateField("balance");
                                            console.log(updateField);
                                        }}
                                    />
                                    Update Balance
                                </label>
                            </div>
                        </FormControl>
                    </div>

                    {/* Operation Type Selection */}
                    <div className="mb-6">
                        <FormControl component="fieldset">
                            <div className="flex items-center">
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        value="add"
                                        checked={operationType === "add"}
                                        onChange={() => setOperationType("add")}
                                    />
                                    Add
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="remove"
                                        checked={operationType === "remove"}
                                        onChange={() =>
                                            setOperationType("remove")
                                        }
                                    />
                                    Remove
                                </label>
                            </div>
                        </FormControl>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-6">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>

                <AlertMessage
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    statusType={statusType}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />

                <LoadingBackdrop open={isLoading} />
            </Drawer.Items>
        </Drawer>
    );
}
