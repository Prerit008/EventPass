
import { Response } from "express";
import razorpay from "../config/razorpay";
import Event from "../models/Event";
import crypto from "crypto";
import QRCode from "qrcode";
import Payment from "../models/Payment";
import Ticket from "../models/Ticket";
import { AuthRequest } from "../middlewares/auth.middleware";
import { generateTicketCode } from "../utils/generateTicketCode";

export const createOrder = async (
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

export const verifyPayment = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            eventId,
        } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(body)
            .digest("hex");

        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }
        const existingTicket =
            await Ticket.findOne({
                userId: req.userId,
                eventId,
            });

        if (existingTicket) {
            return res.status(400).json({
                success: false,
                message:
                    "Ticket already exists",
            });
        }
        const ticketCode = generateTicketCode();

        const qrPayload = JSON.stringify({
            ticketCode,
            eventId,
            userId: req.userId,
        });

        const qrData =
            await QRCode.toDataURL(
                qrPayload
            );

        await Payment.create({
            userId: req.userId,
            eventId,
            amount: 0,
            razorpayOrderId:
                razorpay_order_id,
            razorpayPaymentId:
                razorpay_payment_id,
            status: "success",
        });

        const ticket =
            await Ticket.create({
                ticketCode,

                userId: req.userId,

                eventId,

                paymentId:
                    razorpay_payment_id,

                qrData,
            });

        return res.status(201).json({
            success: true,
            ticket,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
        });
    }
};