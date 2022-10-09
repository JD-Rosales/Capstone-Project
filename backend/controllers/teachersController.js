const User = require('../models/userModel')

//
const getStudents = async (req, res) => {
  try {
    if (!req.body.classCode) {
      return res.status(400).json({ message: "Invalid class code" })
    }
    
    const students = await User.find({ "userInfo.classCode": req.body.classCode, "role":  "student" }).select('-password').lean().exec()

    return res.status(200).json({ students })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getStudents,
}