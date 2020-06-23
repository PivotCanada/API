const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller File

const PostController = require("../controller/posts");

// Routes

router.post("/create", PostController.create);

router.put("/:postId", PostController.update);

router.put("/like/:postId", PostController.like);

router.put("/unlike/:postId", PostController.unlike);

router.get("/all", PostController.all);

router.get("/:postId", PostController.get);

router.get("/user_all/:userId", PostController.userAll);

router.delete("/:postId", PostController.delete);

module.exports = router;
