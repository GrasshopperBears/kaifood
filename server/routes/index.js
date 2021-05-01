import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

export default router;
