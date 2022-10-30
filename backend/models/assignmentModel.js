const mongoose = require('mongoose')
const User = require('./userModel')

const assignmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  classCode: {
    type: String,
    required: true,
  },
  words: {
    type: Array,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  isClose: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Assignment', assignmentSchema)