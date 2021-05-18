import express from "express";
import getGeneralRestaurants from "../services/restaurant/get-general-restaurants";
import getRestaurantInCampus from "../services/restaurant/get-restaurant-in-campus";
import addRestaurant from "../services/restaurant/add-restaurant";
import identifyUser from "../services/user/identify-user";

const router = express.Router();

router.get("/general", getGeneralRestaurants);
router.get("/in-campus", getRestaurantInCampus);
router.post("/", identifyUser, addRestaurant);
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
