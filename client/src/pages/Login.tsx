import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const navigate = useNavigate();

    const setToken =
        useAuthStore(
            (state) => state.setToken
        );

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const data =
                await loginUser(
                    email,
                    password
                );

            setToken(data.token);

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <button type="submit">
                Login
            </button>
        </form>
    );
};

export default Login;