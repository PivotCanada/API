const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Controller File

const TagController = require("../controller/tags");

// Routes

router.post("/create", TagController.create);

router.get("/all", TagController.all);

router.get("/:tagId", TagController.get);

router.get("/search/query=:query", TagController.search);

router.delete("/:tagId", TagController.delete);

module.exports = router;
