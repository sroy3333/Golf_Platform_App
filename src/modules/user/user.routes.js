import express from "express";
import {
  getMyWinnings,
  getDrawHistory,
  getLeaderboard
} from "./user.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/winnings", authMiddleware, getMyWinnings);
router.get("/history", authMiddleware, getDrawHistory);
router.get("/leaderboard", authMiddleware, getLeaderboard);

export default router;