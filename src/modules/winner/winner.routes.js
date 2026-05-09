import express from "express";
import {
  uploadProof,
  verifyWinner,
  getWinners
} from "./winner.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * USER: Upload proof of winning
 */
router.post(
  "/upload-proof",
  authMiddleware,
  uploadProof
);

/**
 * ADMIN: Verify winner (approve/reject)
 */
router.patch(
  "/verify",
  authMiddleware,
  allowRoles("admin"),
  verifyWinner
);

router.get(
  "/",
  authMiddleware,
  getWinners
);

export default router;