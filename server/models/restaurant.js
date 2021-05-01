import mongoose from "mongoose";

const types = ["restarant-in", "cafe-in", "store-in", "restaurant-out", "others"];

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  phoneNumber: String,
  address: String,
  restaurantType: { type: String, enum: types, required: true },
  time: { type: [{ type: String }] },
  provideReservation: { type: Boolean, default: false },
});

const Restaurants = mongoose.model("Restaurant", restaurantSchema);

export default Restaurants;
