const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render("Login");
});
router.get('/verify-account', (req, res) => {
    res.render("VerifyAccount");
});
router.get('/register', (req, res) => {
    res.render("Register");
});
router.get('/forgot-password', (req, res) => {
    res.render("ForgotPassword");
});



module.exports = router;