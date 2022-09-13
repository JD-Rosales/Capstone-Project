const express = require('express')
const router = express.Router()
const { registerGeneralUser } = require('../../controllers/generalUserController')

router.post('/', registerGeneralUser)

module.exports = router