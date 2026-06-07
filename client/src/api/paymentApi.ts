import api from "./axios";

export const createOrder =
    async (
        eventId: string
    ) => {
        const response =
            await api.post(
                "/payments/create-order",
                {
                    eventId,
                }
            );

        return response.data;
    };

export const verifyPayment =
    async (payload: any) => {
        const response =
            await api.post(
                "/payments/verify",
                payload
            );

        return response.data;
    };