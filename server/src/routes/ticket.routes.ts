import { Router } from "express";

import protect from "../middlewares/auth.middleware";
import { getMyTickets, getTicketById } from "../controllers/ticket.controller";

const router = Router();

router.get("/my", protect, getMyTickets);
router.get("/:id", protect, getTicketById);
export default router;