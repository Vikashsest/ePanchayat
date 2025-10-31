import express from "express"
import { createNotice, deleteNotice, getAllNotice, updateNotice } from "../controller/notice.controller.js"

const router=express.Router()

router.post("/notice",createNotice)
router.get("/notice",getAllNotice)
router.patch("/:id",updateNotice)
router.delete("/:id",deleteNotice)

export default router