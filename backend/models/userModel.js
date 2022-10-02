const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    require: [true, 'Role is required']
  },
  userInfo: {
    image: {
      type: String,
      default: "http://res.cloudinary.com/dsdlseso2/image/upload/v1664716394/gdqncwijdswy0mwf7jdl.png"
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required']
    },
    middleInitial: {
      type: String,
    },
    school: {
      type: String,
    },
    classCode: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)