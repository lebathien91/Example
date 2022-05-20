const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const verifyToken = require("../middleware/auth");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/:username", verifyToken, userController.detail);

router.put("/update/:id", verifyToken, userController.update);

router.post("/trash/:id", verifyToken, userController.trash);

router.delete("/destroy/:id", verifyToken, userController.destroy);

router.get("/", verifyToken, userController.reader);

module.exports = router;
