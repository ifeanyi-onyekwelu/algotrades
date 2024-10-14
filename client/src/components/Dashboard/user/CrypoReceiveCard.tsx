import { MdCloudDownload } from "react-icons/md";
import { Button } from "@mui/material";

const CryptoReceiveCard = () => {
    return (
        <div className="flex w-full md:w-1/2 h-fit">
            <div className="md:p-6 rounded-lg md:text-center w-full ">
                {/* Green Circle */}
                <div className="flex justify-center items-center mb-4">
                    <div className="w-12 h-12 bg-emeraldGreen rounded-full flex items-center justify-center">
                        <MdCloudDownload className="text-2xl text-lightGrey" />
                    </div>
                </div>
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Receiving cryptocurrency on your Algorithm Trades account is
                    easy
                </h2>
                {/* Description */}
                <p className="text-gray-600 mb-6">
                    Simply select the crypto you want to receive, select your
                    preferred currency then enter the amount you'll like to
                    receive. Click on generate address to get your unique
                    address
                </p>
                {/* Button */}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#2D6A4F",
                        fontWeight: "bold",
                        padding: "10px 25px",
                        fontSize: "16px",
                        marginTop: "20px",
                    }}
                >
                    Terms
                </Button>
            </div>
        </div>
    );
};

export default CryptoReceiveCard;
