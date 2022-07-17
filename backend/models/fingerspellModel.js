const mongoose = require('mongoose')

const fingerspellSchema = mongoose.Schema({
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