import { Response } from "express";

import Ticket from "../models/Ticket";

import { AuthRequest }
    from "../middlewares/auth.middleware";

export const getMyTickets =
    async (
        req: AuthRequest,
        res: Response
    ) => {
        try {
            const tickets =
                await Ticket.find({
                    userId: req.userId,
                })
                    .populate("eventId")
                    .sort({
                        createdAt: -1,
                    });

            res.json({
                success: true,
                tickets,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
            });
        }
    };

export const getTicketById =
    async (
        req: AuthRequest,
        res: Response
    ) => {
        try {
            const ticket =
                await Ticket.findById(
                    req.params.id
                )
                    .populate("eventId")
                    .populate("userId");

            if (!ticket) {
                return res.status(404).json({
                    message:
                        "Ticket not found",
                });
            }

            res.json({
                success: true,
                ticket,
            });
        } catch {
            res.status(500).json({
                success: false,
            });
        }
    };