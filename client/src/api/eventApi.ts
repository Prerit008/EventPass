import api from "./axios";

export const getEvents = async () => {
    const response =
        await api.get("/events");

    return response.data;
};

export const getEventBySlug =
    async (slug: string) => {
        const response =
            await api.get(
                `/events/${slug}`
            );

        return response.data;
    };