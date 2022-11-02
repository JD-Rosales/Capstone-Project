const express = require('express')
const router = express.Router()
const { addAssignment, getAssignments } = require('../../controllers/assignmentController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/add-assignment', protected, addAssignment)
router.get('/', protected, getAssignments)

module.exports = router