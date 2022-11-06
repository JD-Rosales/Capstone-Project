const User = require('../models/userModel')
const Leaderboard = require('../models/leaderboardModel')
const { find } = require('../models/userModel')

const addLeaderboard = async (req, res) => {
  try {
    const {gameType, difficulty, score, time} = req.body

    if(!gameType, !difficulty, !score, !time){
      return res.status(400).json({message: "Missing required field"})
    }

    const auth = req.user

    await Leaderboard.findOneAndUpdate(
      { "user": auth.id, "gameType": gameType, "difficulty": difficulty },
      {
        user: auth.id,
        gameType: gameType,
        difficulty: difficulty,
        score: score,
        time: time
      },
      {new: true, upsert: true}
    )

    const leaderboards = await Leaderboard.find()

    return res.status(200).json({ leaderboards })
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: "An error has occured"})
  }
}


module.exports = {
  addLeaderboard,
}