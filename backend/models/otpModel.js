const mongoose = require('mongoose')

let otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpType: {
    type: String,
    default: "Signup"
  },
  otp:{
    type: Number,
    required: true,
},
}, {
  timestamps: true
})

otpSchema.index({createdAt: 1},{expireAfterSeconds: 450});

module.exports = mongoose.model('Otp', otpSchema)