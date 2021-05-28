import mongoose from "mongoose";
import Restaurant from "../../models/restaurant";
import Reservation from "../../models/reservation";
import moment from "moment";

const checkReservationValidity = async (req, res, next) => {
  const { id, datetime: reqDatetime } = req.params;
  const rid = mongoose.Types.ObjectId(id);
  const datetime = moment(reqDatetime);
  try {
    const result = await Restaurant.findById(id);
    const {
      outCampusTime: { closeDate, startTime, endTime },
    } = result;
    const start = moment(startTime);
    const end = moment(endTime);
    const startHour = start.hour();
    const startMinute = start.minutes();
    const endHour = end.hour();
    const endMinute = end.minutes();
    const reqHour = datetime.hour();
    const reqMinute = datetime.minutes();

    const timeValidity =
      (reqHour > startHour || (reqHour === startHour && reqMinute >= startMinute)) &&
      (reqHour < endHour || (reqHour === endHour && reqMinute <= endMinute));

    if (closeDate.includes(datetime.day()) || !timeValidity) return res.json({ possible: false });

    const overlapReservation = await Reservation.find({
      restaurant: rid,
      time: { $lte: datetime.subtract(30, "minutes"), $lte: datetime.add(30, "minutes") },
    });
    const currentPeople = overlapReservation.reduce((acc, reservation) => {
      acc += reservation.peopleNumber;
      return acc;
    }, 0);
    req.body.reservationValidity = {
      possible: currentPeople < result.maxReservationNumber,
      currentMaximum: result.maxReservationNumber - currentPeople,
    };
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  next();
};

export default checkReservationValidity;
