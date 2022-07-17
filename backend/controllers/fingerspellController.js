//GET api/fingerspell
const getFingerSpell = async (req, res) => {
  try {
    res.status(200).json({ message: 'GET Finger Spell The Word'})
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
    res.status(200).json({ message: 'SET Finger Spell The Word'})
  } catch (error) {
    console.log(error)
  }

}

//PUT api/fingerspell/:id
const updateFingerSpell = async (req, res) => {
  try {
    res.status(200).json({ message: `UPDATE Finger Spell The Word ${req.params.id}`})
  } catch (error) {
    console.log(error)
  }

}

//DELETE api/fingerspell/:id
const deleteFingerSpell = async (req, res) => {
  try {
    res.status(200).json({ message: `DELETE Finger Spell The Word ${req.params.id}`})
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