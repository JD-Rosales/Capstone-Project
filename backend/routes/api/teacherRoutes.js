const express = require('express')
const router = express.Router()
const { getUnactivated, updateStatus } = require('../../controllers/teachersController')

// router.post('/get-students', getStudents)
router.get('/get-unactivated', getUnactivated)
router.patch('/update-status/:id', updateStatus)

module.exports = router