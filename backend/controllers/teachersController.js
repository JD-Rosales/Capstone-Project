const User = require('../models/userModel')

//
const getStudents = async (req, res) => {
  try {
    console.log(req.body)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getStudents
}