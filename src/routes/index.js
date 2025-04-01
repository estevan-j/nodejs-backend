const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const { malFormedRequestHandler, notFoundHandler, errorHandler, canManageUsers } = require('../middleware/errorHandler');
const router = express.Router();

router.use(malFormedRequestHandler);

router.use('/users', userRoutes);
router.use('/auth', authRoutes)

router.use('/users/:username', canManageUsers);

router.use(notFoundHandler);
router.use(errorHandler);

module.exports = router;