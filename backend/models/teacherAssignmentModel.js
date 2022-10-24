const mongoose = require('mongoose')
const User = require('./userModel')

const teacherAssignmentSchema = mongoose.Schema({
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
  deadline: {
    type: Date,
    required: true,
  },
  submitions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('TeacherAssignment', teacherAssignmentSchema)