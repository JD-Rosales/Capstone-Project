const SpellHandSign = require('../models/spellHandSignModel')

//GET api/fingerspell
const getSpellHandSign = async (req, res) => {
  try {
    const spellHandSign = await SpellHandSign.find()

    res.status(200).json(spellHandSign)
  } catch (error) {
    console.log(error)
  }

}

//POST api/fingerspell/
const setSpellHandSign = async (req, res) => {

  try {
    const spellHandSign = await SpellHandSign.create({

      word: req.body.addWord.toUpperCase(),
      difficulty: req.body.addDifficulty
    })
    res.status(200).json(spellHandSign)
  } catch (error) {
    console.log(error)
  }

}

//PUT api/fingerspell/:id
const updateSpellHandSign = async (req, res) => {
  try {
    const spellHandSign = await SpellHandSign.findById(req.params.id)

    if(!spellHandSign){
      res.status(404).json({ message: 'ID not found!'})
    }

    const updatedSpellHandSign = await SpellHandSign.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
      )
    res.status(200).json(updatedSpellHandSign)
  } catch (error) {
    console.log(error)
  }

}

//DELETE api/fingerspell/:id
const deleteSpellHandSign = async (req, res) => {
  try {
    const spellHandSign = await SpellHandSign.findById(req.params.id)

    if(!spellHandSign){
      res.status(404).json({ message: 'ID not found!'})
    }

    await spellHandSign.remove()
    res.status(200).json({ message: `item with an id of ${req.params.id} has been deleted` })
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  getSpellHandSign,
  setSpellHandSign,
  updateSpellHandSign,
  deleteSpellHandSign
}