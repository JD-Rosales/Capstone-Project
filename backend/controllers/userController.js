const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

//POST api/users
const registerUser = async (req, res) => {

  try {
    //req.body tikang ha http request
    const { email , password } = req.body

    //checkl if username and password is not empty
    if(!email){
      res.status(400).json({ message: 'Email is required'})
    } else if(!password){
      res.status(400).json({ message: 'Please add a password'})
    }

    //check if user already exists
    const userExists = await User.findOne({email})
    if(userExists){
      res.status(409).json({ message: 'Email is already taken'})
    }

    //adi lwat an pag encrypt han password
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //pinaka sql statement ine hiya ha mongodb
    //create user
    const user = await User.create({
      email,
      password: hashPassword
    })

    //return user data if success
    if(user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
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
    const {email, password} = req.body
    console.log(req.body)

    //check if user exist
    const user = await User.findOne({email})
    if(!email){
      res.status(404).json({ message: 'Email not found!'})
    } else {
      //compare hash password
      const authPassword = await bcrypt.compare(password, user.password)
      if(authPassword){
        res.status(200).json({
          _id: user.id,
          email: user.email,
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
    expiresIn: '1d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser
}