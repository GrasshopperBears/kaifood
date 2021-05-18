import express from "express";
import { v4 as uuidV4 } from "uuid";
import multer from "multer";
import addMenu from "../services/menu-out-campus/add-menu";

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

router.get("/", () => {});
router.post("/", upload.single("image"), addMenu);
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
