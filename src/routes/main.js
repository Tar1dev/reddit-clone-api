const express = require('express');
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');
const PostRoutes = require('./PostRoutes');

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/posts', PostRoutes)

module.exports = router;