import mongoose, { Document } from "mongoose";

export interface IScanLog extends Document {
    ticketId: mongoose.Types.ObjectId;
    scannedBy: mongoose.Types.ObjectId;
    deviceName: string;
    scannedAt: Date;
}

const scanLogSchema =
    new mongoose.Schema(
        {
            ticketId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ticket",
            },

            scannedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },

            deviceName: {
                type: String,
                default: "Main Gate",
            },

            scannedAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "ScanLog",
    scanLogSchema
);