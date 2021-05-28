import Reservation from "../../models/reservation";
import MenuOutCampus from "../../models/menu-out-campus";
import { io, connectedOwner } from "../../bin/www";

const checkMenuValidity = async (rid, menus) => {
  const order = [];
  for (const [menuId, number] of Object.entries(menus)) {
    const result = await MenuOutCampus.findById(menuId);
    if (!result || !result.restaurant.equals(rid)) return false;
    order.push({ result, number });
  }
  return order;
};

const requestReservation = async (req, res) => {
  const { uid: customer } = req.body;
  const { reservationValidity, peopleNumber, menus } = req.body;
  const { rid, currentMaximum, possible, datetime } = reservationValidity;
  if (!possible || peopleNumber > currentMaximum) return res.json({ success: false });

  const orders = await checkMenuValidity(rid, menus);
  if (!orders) return res.json({ success: false });
  try {
    const newReservation = await Reservation.create({ customer, restaurant: rid, datetime, peopleNumber, orders });
    io.to(connectedOwner.get(req.params.id)).emit("new reservation", { id: newReservation._id, orders, peopleNumber, datetime });
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default requestReservation;
