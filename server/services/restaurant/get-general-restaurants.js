import Restaurant from "../../models/restaurant";

const getGeneralRestaurants = async (req, res) => {
  try {
    const result = await Restaurant.find({ restaurantType: { $in: ["cafe-in", "store-in"] } });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

export default getGeneralRestaurants;
