const express = require('express')
const router = express.Router()
const { signUp, loginUser, getUser } = require('../../controllers/usersController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', signUp)
router.post('/login', loginUser)
router.get('/me', protected ,getUser)

  module.exports = router