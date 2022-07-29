const Fingerspell = require('../models/fingerspellModel')
// const User = require('../models/userModel')

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

  try {
    const fingerspell = await Fingerspell.create({
      //user is from middleware token
      // user: req.user.id,
      word: req.body.addWord.toUpperCase(),
      difficulty: req.body.addDifficulty.toUpperCase()
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
      res.status(404).json({ message: 'ID not found!'})
    }

    // //check for user
    // const user = await User.findById(req.user.id)
    // if(!user){
    //   res.status(401).json({ message: 'User not fount'})
    // }

    // //make sure logged in user matches the fingerspell user
    // if(fingerspell.user.toString() !== user.id){
    //   res.status(401).json({ message: 'User not authorized to update'})
    // }

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
      res.status(404).json({ message: 'ID not found!'})
    }

    // //check for user
    // const user = await User.findById(req.user.id)
    // if(!user){
    //   res.status(401).json({ message: 'User not fount'})
    // }

    // //make sure logged in user matches the fingerspell user
    // if(fingerspell.user.toString() !== user.id){
    //   res.status(401).json({ message: 'User not authorized to delete'})
    // }

    await fingerspell.remove()
    res.status(200).json({ message: `item with an id of ${req.params.id} has been deleted` })
  } catch (error) {
    console.log(error)
  }
  
}

//GET api/:difficulty
const getFilteredFingerSpell = async (req, res) => {
  try {
    const fingerspell = await Fingerspell.find({ 'difficulty': req.params.difficulty })

    res.status(200).json(fingerspell)
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  getFingerSpell,
  setFingerSpell,
  updateFingerSpell,
  deleteFingerSpell,
  getFilteredFingerSpell
}