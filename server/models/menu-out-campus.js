import mongoose from "mongoose";

const menuOutCampusSchema = new mongoose.Schema({
  rid: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  explanation: String,
});

const MenusOutCampus = mongoose.model("MenuOutCampus", menuOutCampusSchema);

export default MenusOutCampus;
