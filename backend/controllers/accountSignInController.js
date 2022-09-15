const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Student= require('../models/studentModel')
const Teacher = require('../models/teacherModel')
const GeneralUser = require('../models/generalUserModel')

//api/sign-in/:role
const accountSignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const role = req.params.role.toLowerCase()
   if(role === "student"){
      const student = await Student.findOne({"email": email})
      if(student){
        const auth = await bcrypt.compare(password, student.password)
        if(auth){
          //put some code here when login success
          res.status(200).json({message: "Login Success"})
        }else{
          res.status(401).json({message: "Invalid Password"})
        }
      }else{
        res.status(404).json({message: "Email not found"})
      }
   }else if(role === "teacher"){
      const teacher = await Teacher.findOne({"email": email})
      if(teacher){
        const auth = await bcrypt.compare(password, teacher.password)
        if(auth){
          res.status(200).json({message: "Login Success"})
        }else{
          res.status(401).json({message: "Invalid Password"})
        }
      }else{
        res.status(404).json({message: "Email not found"})
      }
   }else{
    const generalUser = await GeneralUser.findOne({"email": email})
    if(generalUser){
      const auth = await bcrypt.compare(password, generalUser.password)
      if(auth){
        res.status(200).json({message:"Login Success"})
      }else{
        res.status(401).json({message:"Invalid Password"})
      }
    }else{
      res.status(404).json({message: "Email not found"})
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
  accountSignIn
}