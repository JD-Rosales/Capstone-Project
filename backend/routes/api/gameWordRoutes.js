const express = require('express')
const router = express.Router()
const { addGameWord, getGameWord, deleteGameWord, updateGameWord }  = require('../../controllers/gameWordController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', protected, addGameWord)
router.get('/:gameType', protected, getGameWord)
router.delete('/:id', protected, deleteGameWord)
router.patch('/:id', protected, updateGameWord)

module.exports = router