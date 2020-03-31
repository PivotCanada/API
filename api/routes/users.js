const express = require("express");
const router = express.Router();

// Controller File

const UserController = require("../controller/users");

// Routes

router.post("/signup", UserController.sign_up);

router.post("/login", UserController.login);

router.get("/all", UserController.all);

router.delete("/:userId", UserController.delete);

module.exports = router;
