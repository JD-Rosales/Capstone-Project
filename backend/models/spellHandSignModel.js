const mongoose = require('mongoose')

const spellHandSignSchema = mongoose.Schema({
  word: {
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

module.exports = mongoose.model('SpellHandSign', spellHandSignSchema)