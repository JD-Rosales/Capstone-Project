const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const GeneralUser = require('../models/generalUserModel')

//POST api/general user
const registerGeneralUser = async (req, res) => {

  try {
    //req.body tikang ha http request
    const { email , password, firstName, lastName, middleInitial } = req.body

    //check if email already exists
    const emailExists = await GeneralUser.findOne({email})
    if(emailExists){
      res.status(409).json({ message: 'Email is already registered'})
    }
   
      //hash the password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const generalUser = await GeneralUser.create({
        email,
        password: hashPassword,
        firstName,
        lastName,
        middleInitial
      })

      if(generalUser){
        res.status(201).json({ message: "Your account successfully created"})
      } else {
        res.status(400).json({ message: "An error has occured"})
      }
    

  } catch (error) {
    console.log(error)
  }
  
}

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })
}

module.exports = {
  registerGeneralUser,
}