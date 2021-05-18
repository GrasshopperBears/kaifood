import express from "express";
import userRouter from "./user";
import restaurantRouter from "./restaurant";
import menuInCampusRouter from "./menu-in-campus";
import menuOutCampusRouter from "./menu-out-campus";
import reservationRouter from "./reservation";
import announcementRouter from "./announcement";
import identifyUser from "../services/user/identify-user";

const router = express.Router();

router.use("/api/user", userRouter);
router.use("/api/restaurant", restaurantRouter);
router.use("/api/menu-in-campus", menuInCampusRouter);
router.use("/api/menu-out-campus", menuOutCampusRouter);
router.use("/api/reservation", identifyUser, reservationRouter);
router.use("/api/announcement", announcementRouter);

router.get("/", (req, res, next) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

export default router;
