import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  createRequest,
  getUserRequests,
  updateRequestStatus,
} from "../controller/requests.controller.js";

const router = express.Router();


router.use(verifyJWT);

router.post("/", createRequest);
router.get("/", getUserRequests);
router.patch("/:id/status", updateRequestStatus);

export default router;
