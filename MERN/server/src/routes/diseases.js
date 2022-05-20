const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/Disease");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, diseaseController.create);

router.get("/:id", diseaseController.detail);

router.put("/update/:id", verifyToken, diseaseController.update);

router.post("/trash/:id", verifyToken, diseaseController.trash);

router.delete("/destroy/:id", verifyToken, diseaseController.destroy);

router.get("/", diseaseController.reader);

module.exports = router;
