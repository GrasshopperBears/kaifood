import Reservation from "../../models/reservation";

const getAllReservations = async (req, res) => {
  const uid = req.body.uid;
  try {
    const result = await Reservation.find({ customer: uid })
      .populate("orders.menuId", "name")
      .populate("restaurant", "name")
      .sort("datetime");
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default getAllReservations;
