import MenusOutCampus from "../../models/menu-out-campus";

const addMenu = async (req, res) => {
  try {
    const { body, file } = req;
    const data = JSON.parse(body.data);
    const result = await MenusOutCampus.create({ ...data, imgUrl: file?.filename || "" });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export default addMenu;
