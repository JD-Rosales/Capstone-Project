const mongoose = require('mongoose')

const generalUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
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
    required: [true, 'Middle Initial is required']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('GeneralUser', generalUserSchema)