import { useState } from "react";

const ReferralLink = ({ link }: { link: string }) => {
    const [copySuccess, setCopySuccess] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess("Copied!");
            setTimeout(() => setCopySuccess(""), 2000);
        });
    };

    return (
        <div className="p-6 rounded-lg shadow-md bg-white space-y-4 w-full my-3">
            <h3 className="text-lg font-semibold text-gray-800">
                Grow Your Algotrades Network
            </h3>
            <p className="text-gray-600">
                Boost your earning potential by inviting friends to join. Share
                your unique referral link below to start building your team. For
                every user you refer who makes an investment, you'll earn a 10%
                bonus! Click the button to copy and share your link.
            </p>

            {/* Referral link input field */}
            <div className="space-y-2">
                <input
                    type="text"
                    value={link}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                >
                    Copy Referral Link
                </button>
                {/* Success Message */}
                {copySuccess && (
                    <p className="text-green-500 text-sm mt-2">{copySuccess}</p>
                )}
            </div>
        </div>
    );
};

export default ReferralLink;
