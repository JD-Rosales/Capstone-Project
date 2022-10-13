const express = require('express')
const router = express.Router()
const { signUp, login, updateProfile } = require('../../controllers/usersController')
// const { protected } = require('../../middlewares/authMiddleware')

router.post('/', signUp)
router.post('/login', login)
router.patch('/update-profile/:id', updateProfile)
// router.get('/me', protected ,getUser)

module.exports = router