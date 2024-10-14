import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EmailVerified = () => {
    const [message, setMessage] = useState("");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get("status");

        if (status === "success") {
            setMessage("Email verified successfully!");
        } else if (status === "error") {
            setMessage("Email verification failed. Invalid or expired token.");
        }
    }, [location]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1>{message}</h1>
        </div>
    );
};

export default EmailVerified;
