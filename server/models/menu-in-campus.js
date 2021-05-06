import mongoose from "mongoose";

const menuInCampusSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  date: Date,
  menuList: { type: [[{ type: String }]] },
});

const MenusInCampus = mongoose.model("MenuInCampus", menuInCampusSchema);

export default MenusInCampus;
