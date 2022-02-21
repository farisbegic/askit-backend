const express = require("express");
const router = express.Router();
const questionRatingController = require("../controllers/questionRatingController")
const checkAccessToken = require("../middleware/checkAccessToken")

// Save Question Rating
router.post("/", checkAccessToken, questionRatingController.saveQuestionRating)

// Update Question Rating
router.put("/", checkAccessToken, questionRatingController.updateQuestionRating)

// Delete Question Rating
router.delete("/:id", checkAccessToken, questionRatingController.deleteQuestionRating)

module.exports = router;