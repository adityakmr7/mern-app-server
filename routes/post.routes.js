const express = require('express');

const postController = require('../controller/post.controller');
const router = express.Router();

router.route('/').get(postController.getAllPost).post(postController.createPost);


router.route("/:id").get(postController.getOnePost).put(postController.updatePost).delete(postController.deletePost);


module.exports = router;
