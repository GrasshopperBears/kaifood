import Restaurant from "../../models/restaurant";

const getRestaurantOutCampus = async (req, res) => {
  const enableFilter = process.env.FILTER_APPROVED_RESTAURANT == "true";
  let query = { restaurantType: "restaurant-out" };
  if (enableFilter) query = { ...query, approved: true };
  try {
    const result = await Restaurant.find(query);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStauts(500);
  }
};

export default getRestaurantOutCampus;
