const express = require("express");

const router = express.Router();

const { body } = require("express-validator/check");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

router.get("/posts", isAuth, feedController.getPosts);

router.post(
  "/posts",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", isAuth, feedController.getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete("/post/:postId", isAuth, feedController.deletePost);

router.get('/status', isAuth, feedController.getStatus);
router.put('/status', isAuth, feedController.updateStatus);

module.exports = router;
