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

//  /api/teacher/update-status/:id
const updateStatus = async (req, res) => {
  try {

    const teacher = await User.findById(req.params.id)
    if(!teacher){
      return res.status(404).json({ message: 'ID not found!'})
    }

    const updatedTeacher = await User.findByIdAndUpdate(
      req.params.id,
      {"userInfo.status": true},
      {new: true}
    )

    const teachers = await User.find({ "role": "teacher", "userInfo.status": false }).select('-password').lean()

    res.status(200).json({ teachers })
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getUnactivated,
  updateStatus,
}