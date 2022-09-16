const express = require('express')
const router = express.Router()
const { registerTeacher, updateTeacherStatus, getAccountRequest } = require('../../controllers/teacherController')

router.post('/', registerTeacher)

router.put('/:id', updateTeacherStatus)

router.get('/', getAccountRequest)

module.exports = router