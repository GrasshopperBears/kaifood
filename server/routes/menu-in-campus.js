import express from "express";
import getTodayMenuInCampus from "../services/menu-in-campus/get-today-menu-in-campus";
import addMenuInCampus from "../services/menu-in-campus/add-menu-in-campus";

const router = express.Router();

router.get("/:rid/:date", () => {});
router.get("/today", getTodayMenuInCampus);
router.post("/", addMenuInCampus);

export default router;
