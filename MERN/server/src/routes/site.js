const express = require("express");
const router = express.Router();
const siteController = require("../controllers/Site");

router.get("/about", siteController.about);

router.get("/contact", siteController.contact);

router.get("/", siteController.index);

module.exports = router;
