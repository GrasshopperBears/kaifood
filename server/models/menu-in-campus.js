import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  menu: String,
});

const menuPerDaySchema = new mongoose.Schema({
  date: Date,
  menus: { type: [{ type: menuSchema }] },
});

const menuInCampusSchema = new mongoose.Schema({
  rid: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  explanation: String,
  menu: { type: [{ type: menuPerDaySchema }] },
});

const MenusInCampus = mongoose.model("MenuInCampus", menuInCampusSchema);

export default MenusInCampus;
