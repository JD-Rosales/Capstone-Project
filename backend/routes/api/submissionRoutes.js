const express = require("express");
const router = express.Router();
const {
  addSubmission,
  checkSubmission,
  getSubmissions,
  getAllProgress,
} = require("../../controllers/submissionController");
const { protected } = require("../../middlewares/authMiddleware");

router.get("/get-submissions/:id", protected, getSubmissions);
router.get("/get-all-progress", protected, getAllProgress);
router.get("/:id", protected, checkSubmission);
router.post("/", protected, addSubmission);

module.exports = router;
