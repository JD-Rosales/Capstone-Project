const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const randomCode = require('randomstring')
const Teacher = require('../models/teacherModel')
const Student = require('../models/studentModel')
const GeneralUser = require('../models/generalUserModel')

//POST api/teacher
const registerTeacher = async (req, res) => {

  try {
    
    //req.body tikang ha http request
    const { email , password, school, firstName, lastName, middleInitial } = req.body

    //check if email already exists
    const emailExists = await Teacher.findOne({email})
    if(emailExists){
      res.status(409).json({ message: 'Email is already registered'})
    }

    //check if classCode has a duplicate
    let classCode;
    while(true){
      classCode = randomCode.generate({
        length: 8,
        readable: true
      })
      const codeExists = await Teacher.findOne({classCode: classCode})

      //if generated code do not exists break the loop
      if(!codeExists){
        break
      }
    }

      //hash the password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const teacher = await Teacher.create({
        email,
        password: hashPassword,
        school,
        firstName,
        lastName,
        middleInitial,
        classCode
      })

      if(teacher){
        res.status(201).json({ message: "Teacher account successfully created"})
      } else {
        res.status(400).json({ message: "An error has occured"})
      }
  } catch (error) {
    console.log(error)
  }
}

//PUT api/teacher/:id
const updateTeacherStatus = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)

    if(!teacher){
      res.status(404).json({ message: 'Teacher account not found!'})
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
      )
    res.status(200).json(updatedTeacher)
  } catch (error) {
    console.log(error)
  }
}

//GET api/teacher
const getAccountRequest = async (req, res) => {
  try {

    const teacher = await Teacher.find({'status': false})

    res.status(200).json(teacher)
    
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
  registerTeacher,
  updateTeacherStatus,
  getAccountRequest
}