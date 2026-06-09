import { Request, Response } from "express";
import { createEventService } from "../services/event.service";
import generateSlug from "../utils/generateSlug";

import Event from "../models/Event";

export const getEvents = async (
    _req: Request,
    res: Response
) => {
    const events = await Event.find({
        status: "published",
    });

    res.json({
        success: true,
        events,
    });
};


export const getAllEventsAdmin = async (
    _req: Request,
    res: Response
) => {
    const events = await Event.find().sort({ createdAt: -1 });

    res.json({
        success: true,
        events,
    });
};
export const deleteEvent =
    async (
        req: Request,
        res: Response
    ) => {

        await Event.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message:
                "Event deleted"
        });
    };

export const getEventBySlug = async (
    req: Request,
    res: Response
) => {
    const event = await Event.findOne({
        slug: req.params.slug,
    });

    if (!event) {
        return res.status(404).json({
            message: "Event not found",
        });
    }

    res.json({
        success: true,
        event,
    });
};


export const createEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const slug = await generateSlug(
            req.body.title
        );

        const event =
            await createEventService({
                ...req.body,
                slug,
            });

        res.status(201).json({
            success: true,
            event,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Server Error"
        });
    }
};