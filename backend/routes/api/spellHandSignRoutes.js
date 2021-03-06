const express = require('express')
const router = express.Router()
const { getSpellHandSign, setSpellHandSign, updateSpellHandSign, deleteSpellHandSign, getFilteredSpellHandSign } = require('../../controllers/spellHandSignController')
const { protected } = require('../../middlewares/authMiddleware')

router.get('/', protected, getSpellHandSign)

router.post('/', protected, setSpellHandSign)

router.put('/:id', protected, updateSpellHandSign)

router.delete('/:id', protected, deleteSpellHandSign)

router.get('/:difficulty', getFilteredSpellHandSign)

module.exports = router