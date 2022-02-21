const express = require("express");
const router = express.Router();
const answerRatingController = require("../controllers/answerRatingController")
const checkAccessToken = require("../middleware/checkAccessToken")

// Save Answer Rating
router.post("/", checkAccessToken, answerRatingController.saveAnswerRating)

// Update Answer Rating
router.put("/", checkAccessToken, answerRatingController.updateAnswerRating)

// Delete Answer Rating
router.delete("/:id", checkAccessToken, answerRatingController.deleteAnswerRating)

module.exports = router;