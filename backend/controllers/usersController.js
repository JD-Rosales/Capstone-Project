const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const randomString = require('randomstring')
const { cloudinary } = require('../config/cloudinary')
const { generateToken } = require('../utils/generateToken');
// const express = require('express')
// const app = express()

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
          const secretCode = req.body.secretCode

          if(secretCode !== process.env.ADMIN_SECRET_CODE) {
            return res.status(403).json({ message: 'Invalid Secret Code' })
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

//api/users/login
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
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
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
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
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
            delete user.password  //removes the password key
            res.status(200).json({ user, token: generateToken(user._id) })
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
            delete user.password  //removes the password key
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

const updateProfile = async (req, res) => {
  try {
    const { lastName, firstName, middleInitial, school, email, image } = req.body

    //check if user exist in the database
    const user = await User.findById(req.params.id).lean().exec()
    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    }

    if (!lastName || lastName === "") {
      res.status(400).json({ message: 'Last Name is required'})
    } else if (!firstName || firstName === "") {
      res.status(400).json({ message: 'First Name is required'})
    } else if (!middleInitial || middleInitial === "") {
      res.status(400).json({ message: 'Middle Initial is required'})
    } else if (!school || school === "") {
      res.status(400).json({ message: 'School is required'})
    } else if (!email || email === "") {
      res.status(400).json({ message: 'Email is required'})
    } else {

      if(!image) {  //retain prev image if there is no image
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            "userInfo.lastName": lastName,
            "userInfo.firstName": firstName,
            "userInfo.middleInitial": middleInitial,
            "userInfo.school": school,
            "email": email 
          },
          {new: true}
        )

        delete updatedUser.password  //remove the password key
        return res.status(200).json({ user: updatedUser, token: generateToken(user._id) })
      } else {

        const uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

        if (uploadResponse.url) { //check if image upload return an image url

          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              "userInfo.lastName": lastName,
              "userInfo.firstName": firstName,
              "userInfo.middleInitial": middleInitial,
              "userInfo.school": school,
              "email": email,
              "userInfo.image": uploadResponse.url
            },
            {new: true}
          )
  
          delete updatedUser.password  //remove the password key
          return res.status(200).json({ user: updatedUser, token: generateToken(user._id) })

        } else {
          return res.status(400).json({ message: "An error has occured!" })
        }

      }

    }

  } catch (error) {
    console.log(error)
  }
}

const updateUserSettings = async (req, res) => {
  try {
    
    //check if user exist in the database
    const user = await User.findById(req.params.id).lean().exec()
    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    } else { 
      if(req.body.hand === undefined){
        return res.status(400).json({ message: 'Please choose hand preference'})
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          "userSettings.hand" : req.body.hand 
        },
        {new: true}
      )
      delete updatedUser.password  //remove the password key
      return res.status(200).json({user:updatedUser, token: generateToken(user._id)})
    }
    
  } catch (error) {
    console.log(error)
  }
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword , newPassword2} = req.body

    if (!currentPassword || !newPassword || !newPassword2) {
      res.status(400).json({ message: 'Input all required fields'})
    }

    const user = await User.findById(req.params.id).lean().exec()

    if(!user){
      return res.status(404).json({ message: 'User not found!'})
    }

    // Check if input password match the old password
    const auth = await bcrypt.compare(currentPassword, user.password)

    if (!auth) {
      return res.status(401).json({ message: "Invalid Current Password!"})
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)

    const updatedPassword = await User.findByIdAndUpdate(
      req.params.id,
      {
        "password": hashPassword
      },
      {new: true}
    )

    delete user.password  //removes the password field
    res.status(200).json({ message: "Password Updated Successfully" })
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  signUp,
  login,
  updateProfile,
  updateUserSettings,
  changePassword
}