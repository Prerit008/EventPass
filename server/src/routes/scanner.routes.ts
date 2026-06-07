import { Router } from "express";
import protect from "../middlewares/auth.middleware";
import authorize from "../middlewares/role.middleware";
import { verifyTicket } from "../controllers/scanner.controller";

const router = Router();

router.post("/verify", protect, authorize("admin", "superAdmin"), verifyTicket);
export default router;