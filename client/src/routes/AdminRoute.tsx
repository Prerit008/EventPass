import { Navigate } from "react-router-dom";

import { useAuthStore }
    from "../store/authStore";

const AdminRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const user =
        useAuthStore(
            state => state.user
        );

    if (
        user?.role !== "admin" &&
        user?.role !== "superAdmin"
    ) {
        return (
            <Navigate to="/" />
        );
    }

    return children;
};

export default AdminRoute;