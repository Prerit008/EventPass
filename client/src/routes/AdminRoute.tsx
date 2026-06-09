import { Navigate } from "react-router-dom";

import { useAuthStore }
    from "../store/authStore";

interface Props {
    children: React.ReactNode;
}

const AdminRoute = ({
    children,
}: Props) => {
    const { user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return <div>Verifying credentials...</div>;
    }
    console.log("AdminRoute Check:", {
        userPresent: !!user,
        role: user?.role,
        tokenPresent: !!localStorage.getItem("token")
    });
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (
        user.role !== "admin" &&
        user.role !== "superAdmin"
    ) {
        return (
            <Navigate to="/" replace />
        );
    }

    return children;
};

export default AdminRoute;