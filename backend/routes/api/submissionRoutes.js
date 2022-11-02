const express = require('express')
const router = express.Router()
const { addSubmission } = require('../../controllers/submissionController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/', protected, addSubmission)

module.exports = router