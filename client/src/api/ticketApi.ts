import api from "./axios";

export const getMyTickets =
    async () => {
        const response =
            await api.get(
                "/tickets/my"
            );

        return response.data;
    };

export const getTicketById =
    async (id: string) => {
        const response =
            await api.get(
                `/tickets/${id}`
            );

        return response.data;
    };