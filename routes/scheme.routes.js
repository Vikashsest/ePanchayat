import express from "express";
import { getSchemes, getSchemesByCategory, createScheme } from "../controller/scheme.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();


router.use(verifyJWT);

router.get("/", getSchemes);
router.get("/:category", getSchemesByCategory);
router.post("/", createScheme);

export default router;
