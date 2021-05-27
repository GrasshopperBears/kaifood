import express from "express";
import getAllReservations from "../services/reservation/get-all-reservations";
import getReservationPossible from "../services/reservation/get-reservation-possible";

const router = express.Router();

router.get("/check/:id/:datetime", getReservationPossible);
router.get("/all", getAllReservations);
router.post("/", () => {});
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
