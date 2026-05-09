import express from "express";
import { addScore } from "./score.controller.js";
import { getScores } from "./score.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { subscriptionMiddleware } from "../../middleware/subscription.middleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, allowRoles("admin"), addScore);
router.get("/", authMiddleware, getScores);

export default router;