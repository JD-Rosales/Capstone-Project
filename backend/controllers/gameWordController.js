const GameWord = require('../models/gameWordModel')

const addGameWord = async (req, res) => {
  try {
    let {gameType, word, difficulty} = req.body

    word = word.toUpperCase()
    difficulty = difficulty.toUpperCase()

    const auth = req.user
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    if(!gameType || !word || !difficulty){
      return res.status(400).json({message: "Please input all required fields"})
    }

    await GameWord.create({
      gameType,
      word,
      difficulty
    })

    const gameWord = await GameWord.find({ "gameType": "fingerspell" })

    return res.status(200).json(gameWord)
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getGameWord = async (req, res) => {
  try {
    const auth = req.user
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const gameWord = await GameWord.find({ "gameType": "fingerspell" })

    return res.status(200).json(gameWord)
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

module.exports = {
  addGameWord,
  getGameWord
}