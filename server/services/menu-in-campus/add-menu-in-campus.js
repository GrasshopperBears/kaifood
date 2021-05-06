import Restaurants from "../../models/restaurant";
import MenusInCampus from "../../models/menu-in-campus";

const addMenuInCampus = async (req, res, next) => {
  const { crawlData } = req.body;
  for (let [restaurantKey, menusPerRestaurant] of Object.entries(crawlData)) {
    let resutaurant;
    try {
      resutaurant = await Restaurants.findOne({ code: restaurantKey });
      if (!resutaurant) return res.sendStatus(400);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
    for (let [date, rawMenu] of Object.entries(menusPerRestaurant)) {
      const menuList = Array(3);
      for (let idx = 0; idx < 3; idx++) {
        menuList[idx] = rawMenu[idx.toString()];
      }
      try {
        await MenusInCampus.findOneAndUpdate({ restaurant: resutaurant._id, date }, { menuList }, { upsert: true });
      } catch (e) {
        console.error(e);
        return res.sendStatus(500);
      }
    }
  }
  res.sendStatus(200);
};

export default addMenuInCampus;
