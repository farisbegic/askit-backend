const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController")

// Save an answer
router.post("/", answerController.saveAnswer)

// Update an answer
router.put("/", answerController.updateAnswer)

// Delete an answer
router.delete("/:id", answerController.deleteAnswer)

// Fetch answers by Question ID
router.get("/question/:id", answerController.getAnswersForQuestion)

module.exports = router