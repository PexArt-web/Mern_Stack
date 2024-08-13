const express = require("express");
const {
  createWorkOut,
  getAllWorkOut,
  getAsingleWorkOut,
  deleteAsingleWorkOut,
  updateAsingleWorkOut,
} = require("../controllers/workOutController");
const router = express.Router();


router.get("/", getAllWorkOut);

router.get("/:workoutId", getAsingleWorkOut);

router.post("/", createWorkOut);

router.delete("/:workoutId", deleteAsingleWorkOut);

router.patch("/:workoutId", updateAsingleWorkOut);

module.exports = router;
