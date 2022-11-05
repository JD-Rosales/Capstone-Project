const express = require('express')
const router = express.Router()
const { addSubmission, checkSubmission } = require('../../controllers/submissionController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/:id', protected, checkSubmission)
router.post('/', protected, addSubmission)

module.exports = router