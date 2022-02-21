const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const checkAccessToken = require("../middleware/checkAccessToken")

// Fetch user information
router.get("/", checkAccessToken, userController.getUser)

// Update user information
router.put("/update-information", checkAccessToken, userController.updateUser)

// Update user password
router.post("/update-password", checkAccessToken, userController.updatePassword)

// Fetch users with most answers (Most active users)
router.get("/most-answers", userController.getUsersWithMostAnswers)

module.exports = router;