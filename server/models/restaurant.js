import mongoose from "mongoose";

const types = ["restaurant-in", "restaurant-in-others", "cafe-in", "store-in", "restaurant-out", "others"];

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, ref: "User" },
  phoneNumber: String,
  address: String,
  code: String,
  restaurantType: { type: String, enum: types, required: true },
  time: { type: [{ type: String }] },
  provideReservation: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  description: String,
});

const Restaurants = mongoose.model("Restaurant", restaurantSchema);

export default Restaurants;
