import { Button, CircularProgress } from "@mui/material";
import { RiRefreshLine } from "react-icons/ri";

const RefetchButton = ({ refetch, isLoading }: any) => {
    return (
        <Button
            variant="outlined"
            endIcon={
                isLoading ? (
                    <CircularProgress
                        size={20}
                        sx={{
                            color: "#264653", // Color of the spinner
                        }}
                    />
                ) : (
                    <RiRefreshLine />
                )
            }
            onClick={refetch}
            sx={{
                color: "#264653", // Primary color for text and outline
                borderColor: "#264653", // Primary color for outline
                "&:hover": {
                    backgroundColor: "#264653", // Background color on hover
                    color: "#fff", // White text on hover
                },
                alignSelf: "flex-start", // Align to the right
                marginTop: 2, // Optional margin for spacing
            }}
        >
            {isLoading ? "Loading..." : "Refetch"}
        </Button>
    );
};

export default RefetchButton;
