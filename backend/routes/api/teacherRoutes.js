const express = require("express");
const router = express.Router();
const {
  getUnactivated,
  updateStatus,
  getAllTeacher,
  suspendAccount,
  unsuspendAccount,
  getEnrolledTeacher,
} = require("../../controllers/teachersController");
const { protected } = require("../../middlewares/authMiddleware");

router.get("/get-unactivated", protected, getUnactivated);
router.get("/get-all", protected, getAllTeacher);
router.get("/get-teacher", protected, getEnrolledTeacher);
router.patch("/update-status/:id", protected, updateStatus);
router.patch("/suspend-account/:id", protected, suspendAccount);
router.patch("/unsuspend-account/:id", protected, unsuspendAccount);

module.exports = router;
