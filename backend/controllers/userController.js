const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

//POST api/users
const registerUser = async (req, res) => {
  try {
    const { username , password } = req.body

    if(!username){
      res.status(400).json({ message: 'Username is required'})
    } else if(!password){
      res.status(400).json({ message: 'Please add a password'})
    }

    //check if user already exists
    const userExists = await User.findOne({password})
    if(userExists){
      res.status(409).json({ message: 'Username is already Taken'})
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
      username,
      password: hashPassword
    })

    //return user data if success
    if(user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        token: generateToken(user._id)
      })
    } else {
      res.status(400).json({ message: 'Invalid user data'})
    }

  } catch (error) {
    console.log(error)
  }
  
}

//POST api/users/login
const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body

    //check if user exist
    const user = await User.findOne({username})
    if(!user){
      res.status(404).json({ message: 'Username not found!'})
    } else {
      //compare hash password
      const authPassword = await bcrypt.compare(password, user.password)
      if(authPassword){
        res.status(200).json({
          _id: user.id,
          username: user.username,
          token: generateToken(user._id)
        })
      } else {
        res.status(401).json({ message: 'Invalid Password' })
      }
    }

  } catch (error) {
    console.log(error)
  }
  
}

//GET api/users/me
const getUser = async (req, res) => {
  try {
    //req.user.id from middleware token
    const { _id, username } = await User.findById(req.user.id)
    res.status(200).json({
      id: _id,
      username
    })
  } catch (error) {
    console.log(error)
  }
  
}

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser
}