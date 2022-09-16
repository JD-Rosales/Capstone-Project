const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const randomString = require('randomstring')

//api/users
const signUp = async (req, res) => {
  try {
    const { email , password, userInfo} = req.body
    const role = req.body.role

    //check if all required fields are present
    if (!email){
      res.status(400).json({ message: 'Email is required'})
    } else if (!password) {
      res.status(400).json({ message: 'Password is required'})
    } else if (role !== "admin" && role !== "teacher" && role !== "student" && role !== "generaluser") {
      res.status(400).json({ message: 'Invalid user role'})
    } else if (!userInfo.firstName) {
      res.status(400).json({ message: 'First name is required'})
    } else if (!userInfo.lastName) {
      res.status(400).json({ message: 'Last name is required'})
    } else {

      //hash the password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      //check if email is already registered
      const emailExists = await User.findOne({"email": email}).lean().exec()
      if (emailExists) {
        res.status(409).json({ message: 'Email is already registered'})
      } else {

        if(role === "admin"){
          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            res.status(201).json({
              _id: user.id,
              email: user.email,
              role: user.role,
              userInfo: user.userInfo
              // token: generateToken(user._id)
            })
          } else {
            res.status(400).json({ message: 'An error has occured'})
          }
        } else if (role === "teacher") {

          //check if school field if present
          if (!userInfo.school) {
            return res.status(400).json({ message: 'School is required'})
          }

          //generate a classCode and check if classCode has a duplicate
          let classCode;
          while(true){
            classCode = randomString.generate({
              length: 8,
              readable: true
            })
            const codeExists = await User.findOne({"role": role, "userInfo.classCode": classCode}).lean().exec()
            //if generated code do not exists break the loop
            if(!codeExists){
              break
            }
          }
          userInfo.classCode = classCode

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            res.status(201).json({
              _id: user.id,
              email: user.email,
              role: user.role,
              userInfo: user.userInfo
              // token: generateToken(user._id)
            })
          } else {
            res.status(400).json({ message: 'An error has occured'})
          }

        } else if (role === "student") {

          //check if school field if present
          if (!userInfo.school) {
            return res.status(400).json({ message: 'School is required'})
          }

          //search class code in teacher role
          const codeExists = await User.findOne({"role": "teacher", "userInfo.classCode": userInfo.classCode}).lean().exec()

          //return if cannot find class code
          if(!codeExists) {
            return res.status(400).json({ message: "Invalid class code"})
          }

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            res.status(201).json({
              _id: user.id,
              email: user.email,
              role: user.role,
              userInfo: user.userInfo
              // token: generateToken(user._id)
            })
          } else {
            res.status(400).json({ message: 'An error has occured'})
          }

        } else {  //generalUser

          const user = await User.create({
            email: email,
            password: hashPassword,
            role: role,
            userInfo: userInfo
          })

          //return user data if success
          if(user) {
            res.status(201).json({
              _id: user.id,
              email: user.email,
              role: user.role,
              userInfo: user.userInfo
              // token: generateToken(user._id)
            })
          } else {
            res.status(400).json({ message: 'An error has occured'})
          }

        }

      }

    }

  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    if (!email) {
      res.status(400).json({ message: 'Email is required'})
    } else if (!password) {
      res.status(400).json({ message: 'Password is required'})
    } else if (!role) {
      res.status(400).json({ message: 'Role is required'})
    } else if (role !== "admin" && role !== "teacher" && role !== "student" && role !== "generaluser") {
      res.status(400).json({ message: 'Invalid user role'})
    } else {

      if(role === "teacher"){
        const user = await User.findOne({ "role": "teacher", email }).lean().exec()
  
        if(!user){
          res.status(404).json({ message: "Email not found"})
        } else {
  
          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if (auth) {
            res.status(200).json({ user })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }
  
      } else if (role === 'student') {
        const user = await User.findOne({ "role": "student", email }).lean().exec()

        if(!user){
          res.status(404).json({ message: "Email not found"})
        } else {

          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if (auth) {
            res.status(200).json({ user })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }
      } else if (role === "admin") {
        const user = await User.findOne({ "role": "admin", email }).lean().exec()

        if (!user) {
          res.status(404).json({ message: "Email not found"})
        } else {

          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if(auth) {
            res.status(200).json({ user })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }

      } else {
        const user = await User.findOne({ "role": "generaluser", email }).lean().exec()

        if (!user) {
          res.status(404).json({ message: "Email not found"})
        } else {

          //compare hash password
          const auth = await bcrypt.compare(password, user.password)
          if(auth) {
            res.status(200).json({ user })
          } else {
            res.status(401).json({ message: "Invalid password"})
          }
        }
      }

    }

  } catch (error) {
    console.log(error)
  }
}

// const loginUser = async (req, res) => {
//   try {
//     const {email, password} = req.body
//     console.log(req.body)

//     //check if user exist
//     const user = await User.findOne({email})
//     if(!user){
//       res.status(404).json({ message: 'Email not found!'})
//     } else {
//       //compare hash password
//       const authPassword = await bcrypt.compare(password, user.password)
//       if(authPassword){
//         res.status(200).json({
//           _id: user.id,
//           email: user.email,
//           token: generateToken(user._id)
//         })
//       } else {
//         res.status(401).json({ message: 'Invalid Password' })
//       }
//     }

//   } catch (error) {
//     console.log(error)
//   }
  
// }

// const getUser = async (req, res) => {
//   try {
//     //req.user.id from middleware token
//     const { _id, username } = await User.findById(req.user.id)
//     res.status(200).json({
//       id: _id,
//       username
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })
}

module.exports = {
  signUp,
  login
}