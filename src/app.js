import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import scoreRoutes from "./modules/score/score.routes.js";
import drawRoutes from "./modules/draw/draw.routes.js";
import charityRoutes from "./modules/charity/charity.routes.js";
import subscriptionRoutes from "./modules/subscription/subscription.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import winnerRoutes from "./modules/winner/winner.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});


app.use(limiter);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/winner", winnerRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.send("Golf Platform API is running 🚀");
});

export default app;
