import mongoose from "mongoose";

const menuInCampusSchema = new mongoose.Schema({
  rid: mongoose.Schema.Types.ObjectId,
  date: Date,
  menuList: { type: [[{ type: String }]] },
});

const MenusInCampus = mongoose.model("MenuInCampus", menuInCampusSchema);

export default MenusInCampus;
