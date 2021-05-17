import MenusInCampus from "../../models/menu-in-campus";
import Restaurant from "../../models/restaurant";

const getMenuOfRestaurant = async (req, res) => {
  const today = new Date();
  const { code } = req.params;
  const todayFormatted = new Date(today.getTime() - today.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
  try {
    const { _id } = await Restaurant.findOne({ code });
    const result = await MenusInCampus.find({ restaurant: _id, date: { $gte: new Date(todayFormatted) } }).populate("restaurant", [
      "name",
      "address",
      "time",
      "phoneNumber",
    ]);
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

export default getMenuOfRestaurant;
