const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");
const {Sequelize} = require("sequelize");
const questionController = require("../controllers/questionController")

// Fetch Hot Questions or questions with most likes
router.get("/most-likes", questionController.getQuestionsWithMostLikes)

// Fetch my questions with load more functionality
router.get("/my-questions/page/:page/size/:size",  questionController.getUserQuestions)

// Fetch a question by id, include likes dislikes
router.get("/:id", questionController.getQuestionDetails)

// Fetch newest question with load more functionality
router.get("/page/:page/size/:size", questionController.getNewestQuestions)

// Save a question
router.post("/", questionController.saveQuestion)

// Delete a question
router.delete("/:id", questionController.deleteQuestion)

// Update a question
router.put("/", questionController.updateQuestion)

module.exports = router;