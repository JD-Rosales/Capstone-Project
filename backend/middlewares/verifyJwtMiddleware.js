const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyJWT = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try {
        //Get Token from Header
        token = req.headers.authorization.split(' ')[1]

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        //get user from the token
        req.user = await User.findById(decoded.id).select('-password')
        res.status(200).json({ message: 'Access Granted', isAuthorized: true })
        next()
      } catch (error) {
        res.status(401).json({ message: 'Session expired!', isAuthorized: false })
        console.log(error)
      }

    }
    
    if(!token){
      res.status(401).json({ message: 'Unauthorized, no token'})
    }

}

module.exports = { verifyJWT }