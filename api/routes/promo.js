const express = require("express");
const router = express.Router();

// Controller File

const PromoController = require("../controller/promo");

// Routes

router.post("/verify", PromoController.exists);
router.post("/add", PromoController.add);
router.get("/all", PromoController.all);
router.delete("/:infoId", PromoController.delete);

module.exports = router;
