import express from "express";
import getGeneralRestaurants from "../services/restaurant/get-general-restaurants";
import getRestaurantInCampus from "../services/restaurant/get-restaurant-in-campus";
import addRestaurant from "../services/restaurant/add-restaurant";
import getRestaurantInfo from "../services/restaurant/get-restaurant-info";
import editRestaurantInfo from "../services/restaurant/edit-restaurant-info";
import identifyUser from "../services/user/identify-user";

const router = express.Router();

router.get("/general", getGeneralRestaurants);
router.get("/in-campus", getRestaurantInCampus);
router.get("/:rid", getRestaurantInfo);
router.post("/", identifyUser, addRestaurant);
router.patch("/:rid", identifyUser, editRestaurantInfo);
router.delete("/", () => {});

export default router;
