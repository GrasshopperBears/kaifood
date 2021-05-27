import Restaurants from "../../models/restaurant";
import moment from "moment";

const addRestaurant = async (req, res) => {
  const uid = req.body.uid;
  const [startTime, endTime] = req.body.time;
  try {
    const result = await Restaurants.create({
      owner: uid,
      ...req.body,
      restaurantType: "restaurant-out",
      outCampusTime: {
        closeDate: req.body.closeDate,
        startTime: moment(startTime),
        endTime: moment(endTime),
      },
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default addRestaurant;
