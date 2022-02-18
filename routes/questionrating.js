const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");
const questionRatingController = require("../controllers/questionRatingController")

// Save Question Rating
router.post("/", questionRatingController.saveQuestionRating)

// Update Question Rating
router.put("/", questionRatingController.updateQuestionRating)

// Delete Question Rating
router.delete("/:id", questionRatingController.deleteQuestionRating)

module.exports = router;