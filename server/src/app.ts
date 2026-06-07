import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import paymentRoutes from "./routes/payment.routes";
import ticketRoutes from "./routes/ticket.routes";
import scannerRoutes from "./routes/scanner.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "API Running"
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/scanner", scannerRoutes);
export default app;