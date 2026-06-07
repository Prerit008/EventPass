import api from "./axios";

export const loginUser = async (
    email: string,
    password: string
) => {
    const response = await api.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
};

export const getCurrentUser =
    async () => {
        const response =
            await api.get("/auth/me");

        return response.data;
    };

export const registerUser = async (
    name: string,
    email: string,
    phone: number,
    password: string
) => {
    const response = await api.post(
        "/auth/register",
        {
            name,
            email,
            phone,
            password,
        }
    );

    return response.data;
};