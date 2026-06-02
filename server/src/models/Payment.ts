import mongoose, { Document } from "mongoose";

export interface IPayment extends Document {
    userId: mongoose.Types.ObjectId;

    eventId: mongoose.Types.ObjectId;

    amount: number;

    razorpayOrderId: string;

    razorpayPaymentId?: string;

    status:
    | "pending"
    | "success"
    | "failed";
}

const paymentSchema =
    new mongoose.Schema<IPayment>(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            eventId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event",
            },

            amount: Number,

            razorpayOrderId: String,

            razorpayPaymentId: String,

            status: {
                type: String,
                enum: [
                    "pending",
                    "success",
                    "failed",
                ],
                default: "pending",
            },
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model<IPayment>(
    "Payment",
    paymentSchema
);