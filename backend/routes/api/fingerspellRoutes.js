const express = require('express')
const router = express.Router()
const { getFingerSpell, setFingerSpell, updateFingerSpell, deleteFingerSpell, getFilteredFingerSpell } = require('../../controllers/fingerspellController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/', protected, getFingerSpell)

router.post('/', protected, setFingerSpell)

router.put('/:id', protected, updateFingerSpell)

router.delete('/:id', protected, deleteFingerSpell)

router.get('/:difficulty', getFilteredFingerSpell)

module.exports = router