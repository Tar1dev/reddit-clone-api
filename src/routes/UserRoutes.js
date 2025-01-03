const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', auth, UserController.getUserById);

module.exports = router;