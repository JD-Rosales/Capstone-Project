const express = require('express')
const router = express.Router()
const { signUp, login, updateProfile, updateUserSettings, changePassword, deleteAccount } = require('../../controllers/usersController')
const { protected } = require('../../middlewares/authMiddleware')
const { saveLog } = require('../../middlewares/logsMiddleware')

router.post('/', signUp)
router.post('/login', saveLog, login)
router.patch('/update-profile/:id', protected, updateProfile)
router.patch('/update-userSettings/:id', protected, updateUserSettings)
router.patch('/change-password/:id', protected, changePassword)
router.delete('/delete-account/:id', protected, deleteAccount)

module.exports = router