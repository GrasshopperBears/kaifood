import express from "express";
import singup from "../services/user/signup";

const router = express.Router();

router.get("/signin/:uid", () => {});
router.get("/check-type/:type", () => {});
router.get("/is-owner/:rid", () => {});
router.post("/signup", singup);

export default router;
