const express = require('express')
const router = express.Router()
const { accountSignIn } = require('../../controllers/accountSignInController')

router.get('/:role', accountSignIn)

module.exports = router