const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  school: {
    type: String,
    required: [true, 'School is required']
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required']
  },
  middleIntitial: {
    type: String,
    required: [true, 'Middle Initial is required']
  },
  classCode: {
    type: String,
    required: [true, 'Class code is required']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Teacher', teacherSchema)