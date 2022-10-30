const express = require('express')
const router = express.Router()
const { addGameWord, getGameWord }  = require('../../controllers/gameWordController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', protected, addGameWord)
router.get('/', protected, getGameWord)

module.exports = router