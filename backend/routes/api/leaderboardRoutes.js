const express = require('express')
const router = express.Router()
const { addLeaderboard, getLeaderboard } = require('../../controllers/leaderBoardController')
const { protected } = require('../../middlewares/authMiddleware')
const { saveLog } = require('../../middlewares/logsMiddleware')

router.put('/', protected, addLeaderboard)
router.post('/', protected, saveLog, getLeaderboard)

module.exports = router