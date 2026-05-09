import express from "express";
import { getStats } from "./admin.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * ADMIN DASHBOARD STATS
 */
router.get(
  "/stats",
  authMiddleware,
  allowRoles("admin"),
  getStats
);

export default router;