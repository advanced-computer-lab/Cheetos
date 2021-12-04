const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')

// Load User model
const User = require('../../models/User');

router.get("/u", userController.getUser)

router.post("/ucreate",userController.createUser)

router.delete("/udelete/:id",userController.deleteUser )

router.put('/uupdate/:id',userController.updateUser)

module.exports = router;

