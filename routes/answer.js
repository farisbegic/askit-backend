const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");

router.post("/", async (req, res) => {
    const { description, questionId } = req.body
    const id = token.getIdFromRefreshToken(req.cookies)

    try {
        const question = await models.Question.findByPk(questionId);

        if (!question) {
            return res.status(400).json({
                message: "Question doesn't exist"
            })
        }

        const answer = await models.Answer.create({
            description: description,
            question: questionId,
            user: id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if (answer) {
            return res.json({
                message: "You have successfully saved an answer",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
})

module.exports = router