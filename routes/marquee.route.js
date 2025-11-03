import express from "express"
import { createMarquee, getMarquee } from "../controller/marquee.controller.js"

const router=express.Router()

router.post("/marques",createMarquee)
router.get("/marques",getMarquee)

export default router