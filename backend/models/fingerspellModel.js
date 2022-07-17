const mongoose = require('mongoose')

const fingerspellSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Please add a text value']
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a text value']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Fingerspell', fingerspellSchema)