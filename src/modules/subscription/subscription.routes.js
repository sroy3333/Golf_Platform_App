import express from "express";
import { createSubscription } from "./subscription.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { getMySubscription } from "./subscription.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createSubscription);
router.get("/", authMiddleware, getMySubscription);


export default router;