import express from "express";
import isOwner from "../services/user/is-owner";
import getAllReservations from "../services/reservation/get-all-reservations";
import checkReservationValidity from "../services/reservation/check-reservation-validity";
import getReservationPossible from "../services/reservation/get-reservation-possible";
import requestReservation from "../services/reservation/request-reservation";
import updateReservationApproved from "../services/reservation/update-reservation-approved";
import getOwnerReservations from "../services/reservation/get-owner-reservations";

const router = express.Router();

router.get("/check/:id/:datetime", checkReservationValidity, getReservationPossible);
router.get("/:id/reservations", isOwner, getOwnerReservations);
router.get("/all", getAllReservations);
router.post("/:id/:datetime", checkReservationValidity, requestReservation);
router.patch("/:id/approved", isOwner, updateReservationApproved);
router.delete("/", () => {});

export default router;
