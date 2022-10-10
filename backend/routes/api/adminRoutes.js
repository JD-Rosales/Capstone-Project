const express = require('express')
const router = express.Router()
const { getUnactivated, updateStatus } = require('../../controllers/adminController')

router.get('/get-unactivated', getUnactivated)
router.patch('/update-status/:id', updateStatus)

module.exports = router