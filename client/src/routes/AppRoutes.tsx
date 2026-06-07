import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import TicketDetails from "../pages/TicketDetails";
import Scanner from "../pages/Scanner";
const AppRoutes = () => {
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

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;