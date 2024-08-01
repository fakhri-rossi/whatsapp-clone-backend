const express = require("express");
const router = express.Router();
const {
  registerUser,
  registerUser2,
  loginUser,
} = require("../controllers/userController.js");

router.post("/register", registerUser);
router.post("/register_verify", registerUser2);
router.post("/login", loginUser);

module.exports = router;
