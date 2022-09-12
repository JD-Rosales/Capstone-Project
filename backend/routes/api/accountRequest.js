const express = require('express')
const router = express.Router()
const { setaccountRequest } = require('../../controllers/accountRequestController')

//adi ak kuys
router.post('/', setaccountRequest)

module.exports = router