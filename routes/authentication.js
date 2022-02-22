const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController")
const checkAccessToken = require("../middleware/checkAccessToken")

// Login
router.post("/login", authenticationController.login)

// Register
router.post("/register", authenticationController.register)

// Generate access token based on refresh token
router.get("/accesstoken", authenticationController.getAccessToken)

// Logout
router.delete("/logout", checkAccessToken, authenticationController.logout)

module.exports = router;