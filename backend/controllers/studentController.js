const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Student= require('../models/studentModel')
const Teacher = require('../models/teacherModel')

//POST api/student
const registerStudent = async (req, res) => {

  try {
    //req.body tikang ha http request
    const { email , password, school, firstName, lastName, middleInitial, classCode } = req.body

    //check if email already exists
    const emailExists = await Student.findOne({email})
    if(emailExists){
      res.status(409).json({ message: 'Email is already registered'})
    }

    const classCodeExists = await Teacher.findOne({classCode})

    if(!classCodeExists){
      res.status(404).json({ message: 'Invalid Class Code'})
    } else {

      //Create Student Account if class code exists

      //hash the password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const student = await Student.create({
        email,
        password: hashPassword,
        school,
        firstName,
        lastName,
        middleInitial,
        classCode
      })

      if(student){
        res.status(201).json({ message: "Student account successfully created"})
      } else {
        res.status(400).json({ message: "An error has occured"})
      }
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
  registerStudent,
}