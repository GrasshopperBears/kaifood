import fs from "fs";
import path from "path";

const getMenuImage = async (req, res) => {
  const { fileName } = req.params;
  const __dirname = path.resolve();
  const imgPath = path.join(__dirname, "./menu-images", fileName);
  try {
    if (fs.existsSync(imgPath)) res.sendFile(imgPath);
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
};

export default getMenuImage;
