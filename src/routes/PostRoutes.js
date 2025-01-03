const express = require('express');
const PostController = require('../controllers/PostController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById)
router.post('/', auth, PostController.createNewPost);

module.exports = router;