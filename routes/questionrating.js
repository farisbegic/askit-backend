const express = require("express");
const router = express.Router();
const questionRatingController = require("../controllers/questionRatingController")

// Save Question Rating
router.post("/", questionRatingController.saveQuestionRating)

// Update Question Rating
router.put("/", questionRatingController.updateQuestionRating)

// Delete Question Rating
router.delete("/:id", questionRatingController.deleteQuestionRating)

module.exports = router;