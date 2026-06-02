import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import generateToken from "../utils/generateToken";

import User from "../models/User";
import { AuthRequest }
    from "../middlewares/auth.middleware";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, phone, password } = req.body;

        const user =
            await registerUser(
                name,
                email,
                phone,
                password
            );

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error instanceof Error ? error.message : "Error" });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(
            email,
            password
        );

        const token = generateToken(
            user._id.toString()
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Login Failed"
        });
    }
};

export const getMe = async (
    req: AuthRequest,
    res: Response
) => {
    const user = await User.findById(
        req.userId
    ).select("-password");

    res.json({
        success: true,
        user
    });
};