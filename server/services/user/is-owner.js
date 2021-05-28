import Restaurants from "../../models/restaurant";

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const { uid } = req.body;
  try {
    const result = await Restaurants.findById(id);
    if (!result || result.owner !== uid) return res.sendStatus(401);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  next();
};

export default isOwner;
