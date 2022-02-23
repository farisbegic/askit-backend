const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController")
const checkAccessToken = require("../middleware/checkAccessToken")

// Fetch Hot Questions or questions with most likes
router.get("/most-likes", questionController.getQuestionsWithMostLikes)

// Fetch My Questions with load more functionality
router.get("/my-questions/page/:page/size/:size", checkAccessToken, questionController.getUserQuestions)

// Fetch a question by id, include likes dislikes
router.get("/:id", checkAccessToken, questionController.getQuestionDetails)

// Fetch newest question with load more functionality
router.get("/page/:page/size/:size", questionController.getNewestQuestions)

// Save a question
router.post("/", checkAccessToken, questionController.saveQuestion)

// Delete a question
router.delete("/:id", checkAccessToken, questionController.deleteQuestion)

// Update a question
router.put("/", checkAccessToken, questionController.updateQuestion)

// Search
router.get("/search/:description", questionController.searchQuestion)

module.exports = router;