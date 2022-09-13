const express = require('express')
const router = express.Router()
const { registerTeacher, updateTeacherStatus } = require('../../controllers/teacherController')

router.post('/', registerTeacher)

router.put('/:id', updateTeacherStatus)

module.exports = router