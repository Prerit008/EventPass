import api from "./axios";

export const getAllEventsAdmin =
    async () => {

        const response =
            await api.get(
                "/events/admin/all"
            );

        return response.data;
    };

export const deleteEvent =
    async (id: string) => {

        const response =
            await api.delete(
                `/events/${id}`
            );

        return response.data;
    };

export const createEvent =
    async (eventData: any) => {

        const response =
            await api.post(
                "/events",
                eventData
            );

        return response.data;
    };