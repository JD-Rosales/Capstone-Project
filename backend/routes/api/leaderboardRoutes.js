const express = require('express')
const router = express.Router()
const { addLeaderboard } = require('../../controllers/leaderBoardController')
const { protected } = require('../../middlewares/authMiddleware')

router.put('/', protected, addLeaderboard)

module.exports = router