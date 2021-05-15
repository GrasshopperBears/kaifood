import express from "express";
import getGeneralRestaurants from "../services/restaurant/get-general-restaurants";
import getRestaurantInCampus from "../services/restaurant/get-restaurant-in-campus";

const router = express.Router();

router.get("/general", getGeneralRestaurants);
router.get("/in-campus", getRestaurantInCampus);
router.post("/", () => {});
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
