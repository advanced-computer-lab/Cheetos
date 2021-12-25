const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const middleware = require("../../controllers/middleware");

router.get("/u/:id", userController.getUserById);

router.post("/ucreate", userController.createUser);

//Existing User
router.put("/uupdate/:id", middleware.verifyJwT, userController.updateUser);

router.put(
  "/passupdate/:id",
  middleware.verifyJwT,
  userController.changeUserPassword
);

router.delete("/udelete/:id", userController.deleteUser);

router.post("/ulogin", userController.login);

module.exports = router;
