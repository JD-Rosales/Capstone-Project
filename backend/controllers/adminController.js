const User = require('../models/userModel')

//  /api/admin/get-unactivated
const getUnactivated = async (req, res) => {
  try {
    const teachers = await User.find({ "role": "teacher", "userInfo.status": false }).select('-password').lean()

    res.status(200).json({ teachers })
  } catch (error) {
    console.log(error)
  }
}

//  /api/admin/get-unactivated
const updateStatus = async (req, res) => {
  try {
    const teachers = await User.find({ "role": "teacher", "userInfo.status": false }).select('-password').lean()

    res.status(200).json({ teachers })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getUnactivated,
}