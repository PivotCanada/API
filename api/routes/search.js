const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller Files

const TagController = require("../controller/tags");

// Routes

router.get("/tags", TagController.search);

module.exports = router;
