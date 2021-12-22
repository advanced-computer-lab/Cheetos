const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// Load User model
const User = require("../../models/User");

router.get("/u/:id", userController.getUserById);

router.post("/ucreate", userController.createUser);

router.delete("/udelete/:id", userController.deleteUser);

router.put("/uupdate/:id", userController.verifyJwT, userController.updateUser);

router.post("/ulogin", userController.login);

module.exports = router;
