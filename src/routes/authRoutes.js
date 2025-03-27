const express = require('express');
const { verifyAcc, login } = require('../controllers');

const router = express.Router();


router.post('/login', login);
router.post('/verify',verifyAcc ); 
// router.patch('/reset-password', resetPassword);

module.exports = router;