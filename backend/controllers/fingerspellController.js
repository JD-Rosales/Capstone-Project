const Fingerspell = require('../models/fingerspellModel')

//GET api/fingerspell
const getFingerSpell = async (req, res) => {
  try {
    const fingerspell = await Fingerspell.find()

    res.status(200).json(fingerspell)
  } catch (error) {
    console.log(error)
  }

}

//POST api/fingerspell/
const setFingerSpell = async (req, res) => {
  //throw an error if either of the fields is empty
  if(!req.body.text || !req.body.difficulty){
    res.status(400)
    throw new Error('Please fill all the required fields')
  }

  try {
    const fingerspell = await Fingerspell.create({
      text: req.body.text,
      difficulty: req.body.difficulty
    })
    res.status(200).json(fingerspell)
  } catch (error) {
    console.log(error)
  }

}

//PUT api/fingerspell/:id
const updateFingerSpell = async (req, res) => {
  try {
    const fingerspell = await Fingerspell.findById(req.params.id)

    if(!fingerspell){
      res.status(400)
      throw new Error('ID not found!')
    }

    const updatedFingerspell = await Fingerspell.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
      )
    res.status(200).json(updatedFingerspell)
  } catch (error) {
    console.log(error)
  }

}

//DELETE api/fingerspell/:id
const deleteFingerSpell = async (req, res) => {
  try {
    const fingerspell = await Fingerspell.findById(req.params.id)

    if(!fingerspell){
      res.status(400)
      throw new Error('ID not found!')
    }

    await fingerspell.remove()
    res.status(200).json({ message: `item with an id of ${req.params.id} has been deleted` })
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  getFingerSpell,
  setFingerSpell,
  updateFingerSpell,
  deleteFingerSpell
}