import express from "express";
import getGeneralRestaurants from "../services/restaurant/get-general-restaurants";

const router = express.Router();

router.get("/general", getGeneralRestaurants);
router.post("/", () => {});
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
