import express from "express";
import { v4 as uuidV4 } from "uuid";
import multer from "multer";
import addMenu from "../services/menu-out-campus/add-menu";
import getMenuImage from "../services/menu-out-campus/get-menu-image";
import getRestaurantMenus from "../services/menu-out-campus/get-restaurant-menus";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "menu-images/");
    },
    filename: (_, file, cb) => {
      cb(null, `${uuidV4()}.${file.mimetype.split("/")[1]}`);
    },
  }),
  limits: { fileSize: MAX_FILE_SIZE },
});

router.get("/menu/:fileName", getMenuImage);
router.post("/", upload.single("image"), addMenu);
router.patch("/", () => {});
router.delete("/", () => {});
router.get("/:rid", getRestaurantMenus);

export default router;
