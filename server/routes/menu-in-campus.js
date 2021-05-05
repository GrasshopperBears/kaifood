import express from "express";
import addMenuInCampus from "../services/menu-in-campus/add-menu-in-campus";

const router = express.Router();

router.get("/:rid/:date", () => {});
router.post("/", addMenuInCampus);

export default router;
