import mongoose from "mongoose";

const menuOutCampusSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  explanation: String,
});

const MenusOutCampus = mongoose.model("MenuOutCampus", menuOutCampusSchema);

export default MenusOutCampus;
