import { Response } from "express";
import razorpay from "../config/razorpay";
import Event from "../models/Event";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createOrder =
    async (
        req: AuthRequest,
        res: Response
    ) => {
        try {
            const { eventId } = req.body;

            const event =
                await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({
                    message: "Event not found",
                });
            }

            const order =
                await razorpay.orders.create({
                    amount:
                        event.price * 100,
                    currency: "INR",
                    receipt: `event_${event._id}`,
                });

            res.json({
                success: true,
                order,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
            });
        }
    };