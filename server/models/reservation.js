import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  menuId: mongoose.Schema.Types.ObjectId,
  number: Number,
});

const reservationSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true },
  rid: { type: mongoose.Schema.Types.ObjectId, required: true },
  time: { type: Date, required: true },
  pending: { type: Boolean, default: true },
  approved: { type: Boolean, default: false },
  peopleNumber: Number,
  memo: String,
  orders: { type: [{ type: orderSchema }] },
});

const Reservations = mongoose.model("Reservation", reservationSchema);

export default Reservations;
