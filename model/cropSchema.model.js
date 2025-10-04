import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sowing: String,
  harvest: String,
  tips: String,
  pdf: String,   // "/uploads/rice.pdf"
  video: String, // "/uploads/rice.mp4"
});

export default mongoose.model("Crop", cropSchema);
