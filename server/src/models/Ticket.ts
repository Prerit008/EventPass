import mongoose, { Document } from "mongoose";

export interface ITicket extends Document {
    ticketCode: string;

    userId: mongoose.Types.ObjectId;

    eventId: mongoose.Types.ObjectId;

    paymentId?: string;

    qrData: string;

    checkedIn: boolean;

    checkedInAt?: Date;
}

const ticketSchema =
    new mongoose.Schema<ITicket>(
        {
            ticketCode: {
                type: String,
                required: true,
                unique: true,
            },

            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            eventId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event",
                required: true,
            },

            paymentId: String,

            qrData: String,

            checkedIn: {
                type: Boolean,
                default: false,
            },

            checkedInAt: Date,
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model<ITicket>(
    "Ticket",
    ticketSchema
);