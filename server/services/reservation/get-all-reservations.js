import Reservation from "../../models/Reservation";

const getAllReservations = async (req, res) => {
  const uid = req.body.uid;
  try {
    const result = await Reservation.find({ customer: uid });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default getAllReservations;
