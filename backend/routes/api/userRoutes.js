const express = require('express')
const router = express.Router()
const { signUp, login } = require('../../controllers/usersController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', signUp)
router.post('/login', login)
// router.get('/me', protected ,getUser)

module.exports = router