import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/auth.routes.tsx";
import UserRoutes from "./routes/user.routes.tsx";
import AdminRoutes from "./routes/admin.routes.tsx";
import PublicRoutes from "./routes/public.routes.tsx";
import NotFoundPage from "./features/errors/NotFoundPage.tsx";
import RequireAuth from "./features/auth/requireAuth.tsx";
import ROLES from "./config/roles";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
    // Initialize AOS globally
    useEffect(() => {
        AOS.init({
            duration: 1000, // Customize the duration or other settings here
            once: true, // Ensures animations only happen once
        });

        // Refresh AOS when components update
        AOS.refresh();
    }, []); // Runs only on initial render

    return (
        <Router>
            <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="auth/*" element={<AuthRoutes />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="dashboard/*" element={<UserRoutes />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin/*" element={<AdminRoutes />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}
