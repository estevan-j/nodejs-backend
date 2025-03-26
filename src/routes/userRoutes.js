const express = require('express');
const { getUser, getAllUsers, createUser, updateUser, deleteUser, getUserByEmail, updatePatchUser } = require('../controllers/userControlloers');
const router = express.Router();

router.get('/:user', getUser)
router.get('/', getAllUsers);
router.get('/:email?', getUserByEmail);
router.post('/', createUser);
router.put('/:user', updateUser);
router.patch('/:user', updatePatchUser);
router.delete('/:user', deleteUser);

module.exports = router;