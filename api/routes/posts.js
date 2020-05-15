const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller File

const PostController = require("../controller/posts");

// Routes

router.post("/create", PostController.create);

router.put("/:postId", PostController.update);

router.get("/all", PostController.all);

router.get("/:postId", PostController.get);

router.delete("/:postId", PostController.delete);

module.exports = router;
