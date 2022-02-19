const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");
const answerController = require("../controllers/answerController")

// Save an answer
router.post("/", answerController.saveAnswer)

// Update an answer
router.put("/", answerController.updateAnswer)

// Delete an answer
router.delete("/:id", answerController.deleteAnswer)

module.exports = router