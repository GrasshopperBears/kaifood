import mongoose from "mongoose";
import MenusOutCampus from "../../models/menu-out-campus";

const getRestaurantMenus = async (req, res) => {
  const rid = mongoose.Types.ObjectId(req.params.rid);
  try {
    const result = await MenusOutCampus.find({ restaurant: rid });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default getRestaurantMenus;
