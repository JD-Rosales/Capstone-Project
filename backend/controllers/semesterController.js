const User = require("../models/userModel");
const Semester = require("../models/semesterModel");

const addSemester = async (req, res) => {
  try {
    const auth = req.user;

    const { name, startDate, endDate } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ message: "Semester name is required" });
    }

    if (!startDate || startDate === "") {
      return res.status(400).json({ message: "Start Date is required" });
    }

    if (!endDate || endDate === "") {
      return res.status(400).json({ message: "End Date is required" });
    }

    const semesterExists = await Semester.find({
      user: auth.id,
      name: name,
    });

    if (semesterExists.length > 0) {
      return res.status(409).json({ message: "Duplicate Semester Name" });
    }

    await Semester.create({
      user: auth.id,
      name: name,
      startDate: startDate,
      endDate: endDate,
    });

    const semesters = await Semester.find({
      user: auth.id,
    })
      .lean()
      .exec();

    return res.status(200).json(semesters);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error has occured" });
  }
};

const getSemesters = async (req, res) => {
  try {
    const auth = req.user;

    const semesters = await Semester.find({
      user: auth.id,
    })
      .lean()
      .exec();

    return res.status(200).json(semesters);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error has occured" });
  }
};

const changeActiveSemester = async (req, res) => {
  try {
    const auth = req.user;

    await Semester.updateMany(
      { user: auth.id, isActive: true },
      { $set: { isActive: false } }
    );

    await Semester.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );

    const semesters = await Semester.find({
      user: auth.id,
    })
      .lean()
      .exec();
    return res.status(200).json(semesters);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error has occured" });
  }
};

module.exports = {
  addSemester,
  getSemesters,
  changeActiveSemester,
};
