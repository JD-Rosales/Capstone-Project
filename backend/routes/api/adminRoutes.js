const express = require('express')
const router = express.Router()
const { getUnactivated } = require('../../controllers/adminController')

router.get('/get-unactivated', getUnactivated)

module.exports = router