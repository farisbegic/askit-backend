const express = require("express");
const router = express.Router();
const answerRatingController = require("../controllers/answerRatingController")

// Save Answer Rating
router.post("/", answerRatingController.saveAnswerRating)

// Update Answer Rating
router.put("/", answerRatingController.updateAnswerRating)

// Delete Answer Rating
router.delete("/:id", answerRatingController.deleteAnswerRating)

module.exports = router;