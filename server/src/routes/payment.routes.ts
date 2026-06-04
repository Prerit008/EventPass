import { Router } from "express";

import protect from "../middlewares/auth.middleware";

import { createOrder, verifyPayment } from "../controllers/payment.controller";

const router = Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
export default router;