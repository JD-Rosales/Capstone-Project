const express = require('express')
const router = express.Router()
const { addAssignment, getAssignments, updateAssignment } = require('../../controllers/assignmentController')
const { protected } = require('../../middlewares/authMiddleware')

router.post('/add-assignment', protected, addAssignment)
router.patch('/update-assignment/:id', protected, updateAssignment)
router.get('/', protected, getAssignments)

module.exports = router