const mongoose = require('mongoose')
const accountRequestSchema = mongoose.Schema({

  teacherID: {
    type: String,
    required: [true, 'Teacher ID is required']
  },
  username: {
    type: String,
    required: [true, 'Please add a username']
  },
  status: {
    type: Boolean,
    required: [true]
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('AccountRequest', accountRequestSchema)