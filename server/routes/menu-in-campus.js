import express from "express";
import getTodayMenuInCampus from "../services/menu-in-campus/get-today-menu-in-campus";
import getMenuOfRestaurant from "../services/menu-in-campus/get-menu-of-restaurant";
import addMenuInCampus from "../services/menu-in-campus/add-menu-in-campus";

const router = express.Router();

router.get("/today", getTodayMenuInCampus);
router.get("/:code", getMenuOfRestaurant);
router.post("/", addMenuInCampus);

export default router;
