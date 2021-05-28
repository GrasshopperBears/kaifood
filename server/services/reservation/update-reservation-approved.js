import mongoose from "mongoose";
import Reservation from "../../models/reservation";

const updateReservationApproved = async (req, res) => {
  const { approve: approved, reservationId } = req.body;
  const _id = mongoose.Types.ObjectId(reservationId);
  try {
    await Reservation.findOneAndUpdate({ _id }, { pending: false, approved });
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default updateReservationApproved;
