import Restaurants from "../../models/restaurant";

const addRestaurant = async (req, res) => {
  const uid = req.body.uid;
  try {
    const result = await Restaurants.create({ owner: uid, ...req.body, restaurantType: "restaurant-out" });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default addRestaurant;
