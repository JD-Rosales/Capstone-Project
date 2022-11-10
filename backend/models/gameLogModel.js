const mongoose = require('mongoose')

const gameLogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  data: [{
    fingerspell: {
      type: Number,
      default: 0
    },
    spellhandsign: {
      type: Number,
      default: 0
    },
    guesshandsign: {
      type: Number,
      default: 0
    },
    fourpic: {
      type: Number,
      default: 0
    },
  }],
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('GameLog', gameLogSchema)