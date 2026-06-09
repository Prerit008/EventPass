import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import TicketDetails from "../pages/TicketDetails";
import Scanner from "../pages/Scanner";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminScanner from "../pages/admin/AdminScanner";
import AdminEvents from "../pages/admin/AdminEvents";

const AppRoutes = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/events" element={<Events />} />
                <Route
                    path="/events/:slug"
                    element={<EventDetails />}
                />
                <Route
                    path="/ticket/:slug"
                    element={<ProtectedRoute>
                        <TicketDetails />
                    </ProtectedRoute>}
                />
                <Route
                    path="/scanner"
                    element={
                        <ProtectedRoute>
                            <Scanner />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >

                    <Route
                        index
                        element={
                            <AdminDashboard />
                        }
                    />
                    <Route
                        path="events"
                        element={
                            <AdminEvents />
                        }
                    />

                    <Route
                        path="scanner"
                        element={
                            <AdminScanner />
                        }
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;