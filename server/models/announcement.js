import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Restaurant" },
  title: { type: String, required: true },
  content: String,
});

const Announcements = mongoose.model("Announcement", announcementSchema);

export default Announcements;
