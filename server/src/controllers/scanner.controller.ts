import { Response } from "express";
import Ticket from "../models/Ticket";
import ScanLog from "../models/ScanLog";
import { AuthRequest } from "../middlewares/auth.middleware";


export const verifyTicket =
    async (
        req: AuthRequest,
        res: Response
    ) => {
        try {
            const { ticketCode } =
                req.body;

            const ticket =
                await Ticket.findOne({
                    ticketCode,
                })
                    .populate("eventId")
                    .populate("userId");

            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Invalid Ticket",
                });
            }

            if (ticket.checkedIn) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Already Checked In",
                });
            }

            ticket.checkedIn = true;

            ticket.checkedInAt =
                new Date();

            await ticket.save();

            await ScanLog.create({
                ticketId: ticket._id,

                scannedBy:
                    req.userId,

                deviceName:
                    req.body.deviceName ||
                    "Main Gate",
            });

            return res.json({
                success: true,
                message:
                    "Entry Allowed",
                ticket,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
            });
        }
    };