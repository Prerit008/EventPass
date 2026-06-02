import { Router } from "express";

import protect from "../middlewares/auth.middleware";

import { createOrder } from "../controllers/payment.controller";

const router = Router();

router.post("/create-order", protect, createOrder);

export default router;