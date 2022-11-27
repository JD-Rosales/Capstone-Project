const express = require("express");
const router = express.Router();
const {
  getUnactivated,
  updateStatus,
  getAllTeacher,
} = require("../../controllers/teachersController");
const { protected } = require("../../middlewares/authMiddleware");

router.get("/get-unactivated", protected, getUnactivated);
router.get("/get-all", protected, getAllTeacher);
router.patch("/update-status/:id", protected, updateStatus);

module.exports = router;
