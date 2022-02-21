const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController")
const checkAccessToken = require("../middleware/checkAccessToken")

// Save an answer
router.post("/", checkAccessToken, answerController.saveAnswer)

// Update an answer
router.put("/", checkAccessToken, answerController.updateAnswer)

// Delete an answer
router.delete("/:id", checkAccessToken, answerController.deleteAnswer)

// Fetch answers by Question ID
router.get("/question/:id", checkAccessToken, answerController.getAnswersForQuestion)

module.exports = router