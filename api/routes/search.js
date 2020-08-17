const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller Files

const TagController = require("../controller/tags");
const UserController = require("../controller/users");
const PostController = require("../controller/posts");

// Routes

router.get("/tags", TagController.search);
router.get("/users", UserController.search);
router.get("/posts", PostController.search);

module.exports = router;
