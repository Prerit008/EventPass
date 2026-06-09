import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "../api/axios";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    token: string | null;
    user: any | null;
    isCheckingAuth: boolean; // <-- Add this to track loading
    setToken: (token: string) => void;
    setUser: (user: any) => void;
    logout: () => void;
    checkAuth: () => Promise<void>; // <-- Add this action
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    user: null,
    isCheckingAuth: true, // Start as true

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },

    setUser: (user) => set({ user, isCheckingAuth: false }), // Turns off loading when user is set

    logout: () => {
        localStorage.removeItem("token");
        set({ token: null, user: null, isCheckingAuth: false });
    },

    checkAuth: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            set({ user: null, isCheckingAuth: false });
            return;
        }

        try {
            const response = await api.get("/auth/me");
            const data = response.data;
            
            // Ensure you are passing the actual user object (e.g., data.user or just data)
            set({ user: data.user || data, isCheckingAuth: false });
        } catch (error) {
            console.error("Auth check failed:", error);
            // If token is invalid/expired
            localStorage.removeItem("token");
            set({ token: null, user: null, isCheckingAuth: false });
        }
    }
}));