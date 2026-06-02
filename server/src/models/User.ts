import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    phone: number;
    role: "user" | "admin" | "superAdmin";
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: Number,
            unique: true,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin", "superAdmin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>(
    "User",
    userSchema
);