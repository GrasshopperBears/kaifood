import mongoose from "mongoose";
import Restaurants from "../../models/restaurant";

const editRestaurantInfo = async (req, res) => {
  const rid = mongoose.Types.ObjectId(req.params.rid);
  const uid = req.body.uid;
  const updateInfo = req.body;
  try {
    await Restaurants.updateOne({ owner: uid, _id: rid }, updateInfo);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.json({ success: false });
  }
};

export default editRestaurantInfo;
