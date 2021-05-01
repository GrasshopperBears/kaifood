import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  rid: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: String,
});

const Announcements = mongoose.model("Announcement", announcementSchema);

export default Announcements;
