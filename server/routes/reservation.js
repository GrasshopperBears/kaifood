import express from "express";
import getAllReservations from "../services/reservation/get-all-reservations";
import checkReservationValidity from "../services/reservation/check-reservation-validity";
import getReservationPossible from "../services/reservation/get-reservation-possible";

const router = express.Router();

router.get("/check/:id/:datetime", checkReservationValidity, getReservationPossible);
router.get("/all", getAllReservations);
router.post("/", () => {});
router.patch("/", () => {});
router.delete("/", () => {});

export default router;
