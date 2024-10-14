import { Outlet } from "react-router-dom";
import Header from "../shared/public/Header.tsx";
import Footer from "../shared/public/Footer.tsx";

function PublicLayout() {
    return (
        <div>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default PublicLayout;
