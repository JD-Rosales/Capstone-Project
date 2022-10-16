const User = require('../models/userModel')

const getEnrolledStudents = async (req, res) => {
  try {
    const students = await User.find({ "userInfo.classCode": req.params.classCode, "role":  "student" }).select('-password').lean().exec()

    return res.status(200).json({ students })
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  getEnrolledStudents,
}