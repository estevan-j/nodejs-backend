const express = require('express');
const { verifyAcc, login, requestResetPassword, resetPassword } = require('../controllers');

const router = express.Router();


router.post('/login', login);
router.post('/verify',verifyAcc ); 
router.post('/request-reset-password', requestResetPassword);
router.patch('/reset-password/:email', resetPassword);

module.exports = router;