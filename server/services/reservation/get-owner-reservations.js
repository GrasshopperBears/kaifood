import mongoose from "mongoose";
import Reservation from "../../models/reservation";

const getOwnerReservations = async (req, res) => {
  const rid = mongoose.Types.ObjectId(req.params.id);
  try {
    const result = await Reservation.find({ restaurant: rid })
      .populate("orders.menuId", "name")
      .populate("restaurant", "name")
      .sort("datetime");
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default getOwnerReservations;
