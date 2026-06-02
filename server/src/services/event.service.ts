import Event from "../models/Event";

export interface CreateEventInput {
    title: string;
    description: string;
    venue: string;
    startDate: Date;
    endDate: Date;
    price: number;
    capacity: number;
    slug: string;
}

export const createEventService =
    async (data: CreateEventInput) => {
        const event = new Event(data);
        return await event.save();
    };