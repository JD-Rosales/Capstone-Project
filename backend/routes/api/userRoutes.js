const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../../controllers/userController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protected ,getUser)

  module.exports = router