const express = require('express');

const postController = require('../controller/post.controller');
const { isAuthenticate } = require('../middleware/isAuthenticate');
const router = express.Router();

router.route('/').get(postController.getAllPost).post( isAuthenticate, postController.createPost);


router.route("/:id").get(isAuthenticate,postController.getOnePost).put(isAuthenticate,postController.updatePost).delete(isAuthenticate,postController.deletePost);


module.exports = router;
