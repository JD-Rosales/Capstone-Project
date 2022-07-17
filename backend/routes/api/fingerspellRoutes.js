const express = require('express')
const router = express.Router()
const { getFingerSpell, setFingerSpell, updateFingerSpell, deleteFingerSpell } = require('../../controllers/fingerspellController')

router.get('/', getFingerSpell)

router.post('/', setFingerSpell)

router.put('/:id', updateFingerSpell)

router.delete('/:id', deleteFingerSpell)

module.exports = router