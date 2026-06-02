import { Router } from "express";

import protect from "../middlewares/auth.middleware";
import authorize from "../middlewares/role.middleware";

import { createEvent, getEventBySlug, getEvents } from "../controllers/event.controller";

const router = Router();

router.post(
    "/",
    protect,
    authorize("admin", "superAdmin"),
    createEvent
);
router.get("/", getEvents);
router.get("/:slug", getEventBySlug);

export default router;