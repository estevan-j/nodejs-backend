const express = require('express');
const { getUser } = require('../controllers/userControlloers');
const router = express.Router();

router.get('/:user', getUser)
// router.post('/', createUser)
// router.put('/:user', updateUser)
// router.delete('/:user', deleteUser)

module.exports = router;