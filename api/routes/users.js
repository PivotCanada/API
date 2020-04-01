const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller File

const UserController = require("../controller/users");

// Routes

router.post("/signup", UserController.sign_up);

router.post("/login", UserController.login);

router.get("/:userId", UserController.get_user);

router.get("/all", authenticate, UserController.all);

router.delete("/:userId", UserController.delete);

module.exports = router;
