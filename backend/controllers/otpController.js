const User = require('../models/userModel')
const Otp = require('../models/otpModel')
const nodemailer = require('nodemailer');
const randomString = require('randomstring')
const speakeasy = require('speakeasy')

const sendOTP = async (req, res, next) => {
  try {

    // generate otp
    const otp = randomString.generate({
      length: 6,
      charset: 'numeric'
    })

    sendMail(otp)

    await Otp.findOneAndUpdate(
      { "email":  "1901554@lnu.edu.ph"},
      {
        email: "1901554@lnu.edu.ph",
        otp: otp,
      },
      {new: true, upsert: true}
    )

    return res.status(200).json({ message: "OTP sent!" })
    next()
    
  } catch (error) {
    console.log(error)
  }
}

const verifyOTP = async (req, res) => {
  try {

    const {otp, email} = req.body

    const auth = await Otp.findOne({"email": email, "otp": otp}).lean().exec()

    if(!auth){
      return res.status(400).json({ message: "Invalid OTP" })
    } else {
      return res.status(200).json({ message: "Success" })
    }
    
  } catch (error) {
    console.log(error)
  }
}

const sendMail = async (otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: 'process.env.EMAIL',
    to: '1901554@lnu.edu.ph',
    subject: 'Test Email',
    text : otp
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
      return info
      // do something useful
    }
  });
}


module.exports = {
  sendOTP,
  verifyOTP
}