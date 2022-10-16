const express = require('express')
const router = express.Router()
const { signUp, login, updateProfile, updateUserSettings, changePassword } = require('../../controllers/usersController')
// const { protected } = require('../../middlewares/authMiddleware')

router.post('/', signUp)
router.post('/login', login)
router.patch('/update-profile/:id', updateProfile)
router.patch('/update-userSettings/:id', updateUserSettings)
router.patch('/change-password/:id', changePassword)
// router.get('/me', protected ,getUser)

module.exports = router