import express from "express";
import { createActivity, getRecentActivities } from "../controller/activity.controller.js";

const router = express.Router();
router.post("/", createActivity);
router.get("/:userId", getRecentActivities);

export default router;
