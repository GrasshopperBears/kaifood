import User from "../../models/user";
import Restaurants from "../../models/restaurant";

const signin = async (req, res) => {
  try {
    const { uid } = req.body;
    const { userType } = await User.findOne({ uid });
    const isOwner = userType.includes("owner");
    const restaurants = isOwner ? await Restaurants.find({ owner: uid }, ["name"]) : [];
    res.json({ success: true, isOwner, restaurants });
  } catch (e) {
    console.error(e);
    res.json({ success: false });
  }
};

export default signin;
