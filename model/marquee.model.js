import mongoose from "mongoose";

const marqueeSchema = new mongoose.Schema(
  {
    info: {
      type: String,
    },
    new: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

export default mongoose.models.marquee ||
  mongoose.model("marquee", marqueeSchema);
