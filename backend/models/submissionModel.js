const mongoose = require('mongoose')
const User = require('./userModel')

const submissionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: User,
  },
  timeLeft: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Submission', submissionSchema)