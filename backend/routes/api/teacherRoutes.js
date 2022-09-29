const express = require('express')
const router = express.Router()
const { getStudents } = require('../../controllers/teachersController')

router.post('/get-students', getStudents)

module.exports = router