import { Router } from "express";
import protect from "../middlewares/auth.middleware";
import authorize from "../middlewares/role.middleware";
import { getStats } from "../controllers/admin.controller";

const router = Router();

router.get(
    "/stats",
    protect,
    authorize(
        "admin",
        "superAdmin"
    ),
    getStats
);

export default router;