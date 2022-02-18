const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

// Fetch user information
router.get("/", userController.getUser)

// Update user information
router.put("/update-information", userController.updateUser)

// Update user password
router.post("/update-password", userController.updatePassword)

// Fetch users with most answers (Most active users)
router.get("/most-answers", userController.getUsersWithMostAnswers)

module.exports = router;