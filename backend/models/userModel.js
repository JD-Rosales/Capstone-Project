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