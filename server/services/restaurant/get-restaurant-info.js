import Restaurant from "../../models/restaurant";

const getRestaurantInfo = async (req, res) => {
  const rid = req.params.rid;
  try {
    const result = await Restaurant.findById(rid);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

export default getRestaurantInfo;
