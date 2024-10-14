import { Outlet } from "react-router-dom";
import Footer from "../shared/public/Footer";

function AuthLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}

export default AuthLayout;
