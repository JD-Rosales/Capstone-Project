const express = require('express')
const router = express.Router()
const { getStudents } = require('../../controllers/teachersController')

router.get('/', getStudents)

module.exports = router