const User = require("../models/userModel");
const Semester = require("../models/semesterModel");

const getEnrolledStudents = async (req, res) => {
  try {
    const auth = req.user;

    const students = await User.find({
      "userInfo.classCode": req.params.classCode,
      role: "student",
    })
      .select("-password")
      .sort({ isActive: -1 })
      .lean()
      .exec();

    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
  }
};

const getActiveEnrolledStudents = async (req, res) => {
  try {
    const auth = req.user;

    const activeSemester = await Semester.findOne({
      user: auth._id,
      isActive: true,
    });

    if (!activeSemester?.name) {
      return res.status(400).json({ message: "No Active Semester" });
    }

    const students = await User.find({
      "userInfo.classCode": req.params.classCode,
      role: "student",
      isActive: true,
      enrolledSem: activeSemester.name,
    })
      .select("-password")
      .lean()
      .exec();

    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
  }
};

const suspendAccount = async (req, res) => {
  try {
    const { classCode } = req.body;

    const auth = req.user;

    if (auth.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      { new: true }
    );

    const students = await User.find({
      "userInfo.classCode": classCode,
      role: "student",
    })
      .select("-password")
      .lean()
      .exec();

    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error has occured" });
  }
};

const unsuspendAccount = async (req, res) => {
  try {
    const { classCode } = req.body;

    const auth = req.user;

    if (auth.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: true,
      },
      { new: true }
    );

    const students = await User.find({
      "userInfo.classCode": classCode,
      role: "student",
    })
      .select("-password")
      .lean()
      .exec();

    return res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "An error has occured" });
  }
};

module.exports = {
  getEnrolledStudents,
  getActiveEnrolledStudents,
  suspendAccount,
  unsuspendAccount,
};
