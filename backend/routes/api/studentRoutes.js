const express = require('express')
const router = express.Router()
const { getEnrolledStudents } = require('../../controllers/studentController')

router.get('/get-students/:classCode', getEnrolledStudents)

module.exports = router