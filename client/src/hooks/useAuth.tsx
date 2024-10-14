import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token: any = localStorage.getItem("token");
    let isAdmin = false;
    let isUser = false;
    let status = null;

    if (token) {
        const decoded: any = jwtDecode(token);
        const { username, role } = decoded.user;

        isUser = role === "user";
        isAdmin = role === "admin";

        if (isUser) status = "User";
        if (isAdmin) status = "Admin";

        return { username, role, status, isUser, isAdmin };
    }

    return { username: "", role: "", isUser, isAdmin, status };
};
export default useAuth;
