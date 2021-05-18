import express from "express";
import identifyUser from "../services/user/identify-user";
import singup from "../services/user/signup";
import requestOwner from "../services/user/request-owner";

const router = express.Router();

router.get("/signin/:uid", () => {});
router.get("/check-type/:type", () => {});
router.get("/is-owner/:rid", () => {});
router.post("/signup", singup);
router.post("/request-owner", identifyUser, requestOwner);

export default router;
