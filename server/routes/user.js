import express from "express";

const router = express.Router();

router.get("/signin/:uid", () => {});
router.get("/check-type/:type", () => {});
router.get("/is-owner/:rid", () => {});
router.post("/new-user-nickname", () => {});

export default router;
