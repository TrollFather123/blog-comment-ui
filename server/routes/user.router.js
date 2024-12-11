const userController = require("../controller/userController")
const express = require("express");

const router = express.Router();

router.post("/create-user",userController.createUser);
router.post("/login-user",userController.userLogin);
router.get("/:id",userController.getUserDetails);

module.exports = router