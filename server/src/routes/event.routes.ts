import { Router } from "express";

import protect from "../middlewares/auth.middleware";
import authorize from "../middlewares/role.middleware";

import { deleteEvent, createEvent, getEventBySlug, getEvents, getAllEventsAdmin } from "../controllers/event.controller";

const router = Router();

router.post(
    "/",
    protect,
    authorize("admin", "superAdmin"),
    createEvent
);

router.get("/", getEvents);
router.get("/:slug", getEventBySlug);
router.get(
    "/admin/all",
    protect,
    authorize(
        "admin",
        "superAdmin"
    ),
    getAllEventsAdmin
);
router.delete(
    "/:id",
    protect,
    authorize(
        "admin",
        "superAdmin"
    ),
    deleteEvent
);
export default router;