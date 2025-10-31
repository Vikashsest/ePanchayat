import mongoose from "mongoose";

const noticeBoardSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.noticeBoard ||
  mongoose.model("noticeBoard", noticeBoardSchema);
