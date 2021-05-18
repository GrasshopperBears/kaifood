import express from "express";
import getAllReservations from "../services/reservation/get-all-reservations";

const router = express.Router();

router.get("/all", getAllReservations);
router.post("/", () => {});
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
