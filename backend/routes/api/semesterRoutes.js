const express = require("express");
const router = express.Router();
const {
  addSemester,
  getSemesters,
  changeActiveSemester,
} = require("../../controllers/semesterController");
const { protected } = require("../../middlewares/authMiddleware");

router.post("/", protected, addSemester);
router.get("/", protected, getSemesters);
router.patch("/:id", protected, changeActiveSemester);

module.exports = router;
