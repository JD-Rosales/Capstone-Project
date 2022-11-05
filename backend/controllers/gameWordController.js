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

    const gameWord = await GameWord.find({ "gameType": gameType })

    return res.status(200).json(gameWord)
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const getGameWord = async (req, res) => {
  try {
    const auth = req.user
    // if(auth.role !== "admin"){
    //   return res.status(401).json({message: "Unauthorized"})
    // }

    const gameWord = await GameWord.find({ "gameType": req.params.gameType })

    return res.status(200).json(gameWord)
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const deleteGameWord = async (req, res) => {
  try {

    const auth = req.user
    
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const findGameWord = await GameWord.findById(req.params.id)

    if(!findGameWord){
      res.status(404).json({ message: 'ID not found!'})
    }

    await findGameWord.remove()

    const gameWord = await GameWord.find({ "gameType": findGameWord.gameType })

    return res.status(200).json(gameWord)

  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}

const updateGameWord = async (req, res) => {
  try{

    let {gameType, word, difficulty} = req.body

    if(!gameType || !word || !difficulty){
      return res.status(400).json({message: "Please input all required fields"})
    }

    word = word.toUpperCase()
    difficulty = difficulty.toUpperCase()

    const auth = req.user
    if(auth.role !== "admin"){
      return res.status(401).json({message: "Unauthorized"})
    }

    const findGameWord = await GameWord.findById(req.params.id)

    if(!findGameWord){
      return res.status(404).json({message: 'ID not found'})
    }

    await GameWord.findByIdAndUpdate(
      req.params.id, 
      {
        "word": word,
        "difficulty": difficulty,
        "gameType": gameType,
      },
      {new: true}
    )

    const gameWord = await GameWord.find({ "gameType": gameType })

    return res.status(200).json(gameWord)
  } catch (error){
    console.log(error)
    return res.status(400).jason({message: "An error has occured"})
  }
} 

module.exports = {
  addGameWord,
  getGameWord,
  deleteGameWord,
  updateGameWord,
}