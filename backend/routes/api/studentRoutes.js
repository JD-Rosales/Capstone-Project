const express = require("express");
const router = express.Router();
const {
  getEnrolledStudents,
  suspendAccount,
  unsuspendAccount,
} = require("../../controllers/studentController");
const { protected } = require("../../middlewares/authMiddleware");

router.get("/get-students/:classCode", protected, getEnrolledStudents);
router.patch("/suspend-account/:id", protected, suspendAccount);
router.patch("/unsuspend-account/:id", protected, unsuspendAccount);

module.exports = router;
