const mongoose = require('mongoose')
const User = require('./userModel')

const assignmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  deadline: {
    type: Date,
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
  status:{
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Assignment', assignmentSchema)