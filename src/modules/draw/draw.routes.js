import express from "express";
import { createDraw, runDraw, getDraws } from "./draw.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, allowRoles("admin"), createDraw);
router.post("/run", authMiddleware, allowRoles("admin"), runDraw);

router.get("/", authMiddleware, getDraws);

// CREATE DRAW
router.post(
  "/create",
  authMiddleware,
  allowRoles("admin"),
  createDraw
);

// RUN DRAW
router.post(
  "/run",
  authMiddleware,
  allowRoles("admin"),
  runDraw
);

export default router;