import MenusInCampus from "../../models/menu-in-campus";

const getTodayMenuInCampus = async (req, res) => {
  const today = new Date();
  const todayFormatted = new Date(today.getTime() - today.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
  try {
    const result = await MenusInCampus.find({ date: new Date(todayFormatted) }).populate("restaurant", "code");
    res.json(result);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  res.sendStatus(200);
};

export default getTodayMenuInCampus;
