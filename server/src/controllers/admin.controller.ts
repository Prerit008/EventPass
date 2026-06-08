import User from "../models/User";
import Event from "../models/Event";
import Ticket from "../models/Ticket";
import { Request, Response } from "express";

export const getStats = async (req: Request, res: Response) => {
    const totalUsers = await User.countDocuments();

    const totalEvents = await Event.countDocuments();

    const totalTickets = await Ticket.countDocuments();

    const checkedIn = await Ticket.countDocuments({ checkedIn: true, });

    res.json({
        success: true,
        stats: {
            totalUsers,
            totalEvents,
            totalTickets,
            checkedIn,
        },
    });
};