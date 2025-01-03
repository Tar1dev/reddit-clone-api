const express = require('express');
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);

module.exports = router;