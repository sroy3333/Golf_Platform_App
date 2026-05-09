import express from "express";
import { addCharity, getCharities } from "./charity.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { allowRoles } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getCharities);

router.post("/add", authMiddleware, allowRoles("admin"), addCharity);

export default router;