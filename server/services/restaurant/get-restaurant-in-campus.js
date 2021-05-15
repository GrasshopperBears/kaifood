import Restaurant from "../../models/restaurant";

const getRestaurantInCampus = async (req, res) => {
  try {
    const result = await Restaurant.find({ restaurantType: { $in: ["restarant-in", "restarant-in-others"] } });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

export default getRestaurantInCampus;
