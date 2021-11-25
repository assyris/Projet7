const router = require('express').Router();
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const multer = require("multer");
const upload = multer();
// const multer = require("../middleware/multer-config");


router.post('/', upload.single("file"), postController.createPost);
router.get('/', postController.readPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// comments
router.patch('/comment-post/:id', commentController.commentPost);
router.patch('/delete-comment-post/:id', commentController.deleteCommentPost);

module.exports = router;