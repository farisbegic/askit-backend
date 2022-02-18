const express = require("express");
const router = express.Router();
const models = require('../database/models')
const bcrypt = require("bcryptjs");
const findUserByEmail = require("../helpers/findUserByEmail")
const token = require("../helpers/token")
const authenticationController = require("../controllers/authenticationController")

// Login
router.post("/login", authenticationController.login)

// Register
router.post("/register", authenticationController.register)

// Generate access token based on refresh token
router.get("/accesstoken", authenticationController.getAccessToken)

// Logout
router.delete("/logout", authenticationController.logout)

module.exports = router;