import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, default: "#" },
});

export const Scheme = mongoose.model("Scheme", schemeSchema);
