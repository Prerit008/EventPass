import api from "./axios";

export const verifyTicket =
    async (
        ticketCode: string
    ) => {
        const response =
            await api.post(
                "/scanner/verify",
                {
                    ticketCode,
                    deviceName: "Gate A",
                }
            );

        return response.data;
    };