import mongoose, { Document } from "mongoose";

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    venue: string;
    startDate: Date;
    endDate: Date;
    price: number;
    capacity: number;
    registeredCount: number;
    status: "draft" | "published" | "completed";
}

const eventSchema = new mongoose.Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            type: String,
            required: true,
        },

        venue: {
            type: String,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        price: {
            type: Number,
            default: 0,
        },

        capacity: {
            type: Number,
            required: true,
        },

        registeredCount: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["draft", "published", "completed"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IEvent>(
    "Event",
    eventSchema
);