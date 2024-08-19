const express = require("express");
const router = express.Router();
const {
  createWorkOut,
  getAllWorkOut,
  getAsingleWorkOut,
  deleteAsingleWorkOut,
  updateAsingleWorkOut,
} = require("../controllers/workOutController");
const requireAuth = require('../middleware/requireAuth')
// require Auth for all workout routes


router.use(requireAuth);

router.get("/", getAllWorkOut);

router.get("/:workoutId", getAsingleWorkOut);

router.post("/", createWorkOut);

router.delete("/:workoutId", deleteAsingleWorkOut);

router.patch("/:workoutId", updateAsingleWorkOut);

module.exports = router;
