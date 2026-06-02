import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import User from "../models/User";

const authorize =
    (...roles: string[]) =>
        async (
            req: AuthRequest,
            res: Response,
            next: NextFunction
        ) => {
            const user = await User.findById(
                req.userId
            );

            if (
                !user ||
                !roles.includes(user.role)
            ) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            next();
        };

export default authorize;