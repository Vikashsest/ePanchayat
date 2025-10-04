import express from "express";
import multer from "multer";
import path from "path";
import {
  getCrops,
  createCrop,
  updateCrop,
  deleteCrop,
} from "../controllers/cropController.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getCrops);
router.post("/", upload.fields([{ name: "pdf" }, { name: "video" }]), createCrop);
router.put("/:id", upload.fields([{ name: "pdf" }, { name: "video" }]), updateCrop);
router.delete("/:id", deleteCrop);

export default router;
