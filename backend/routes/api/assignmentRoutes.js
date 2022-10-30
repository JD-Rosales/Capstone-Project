const express = require('express')
const router = express.Router()
const { addAssignment } = require('../../controllers/assignmentController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/add-assignment', protected, addAssignment)

module.exports = router