const User = require('../models/userModel')

const saveLog = async (req, res, next) => {
  try {
    const data = req
    console.log("data.originalUrl")
    
    next()
  } catch (error) {
    return res.status(400).json({message: "Unauthorized, invalid credentials"})
  }
}

module.exports = { saveLog }