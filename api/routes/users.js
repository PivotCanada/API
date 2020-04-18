const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller File

const UserController = require("../controller/users");

// Routes

router.get("/test", UserController.test);

router.post("/validate", UserController.validate);

router.post("/signup", UserController.sign_up);

router.post("/login", UserController.login);

router.post("/verify", UserController.exists);

router.put("/:userId", UserController.update);

router.get("/all", UserController.all);

router.get("/:userId", UserController.get_user);

router.delete("/:userId", UserController.delete);

module.exports = router;
