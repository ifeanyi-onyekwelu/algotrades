import { Outlet } from "react-router-dom";
import Footer from "../shared/public/Footer";
import Header from "../shared/public/Header";

function AuthLayout() {
    return (
        <>
            <Header />
            <main className="pt-28">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default AuthLayout;
