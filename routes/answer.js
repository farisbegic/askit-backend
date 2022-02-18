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
        return gres.status(500).json({
            message: err.message,
        });
    }
})

router.put("/", async (req, res) => {
    const { answerId, description } = req.body;
    const id = token.getIdFromRefreshToken(req.cookies)

    try {
        const answer = await models.Answer.findByPk(answerId);

        if (!answer) {
            return res.status(400).json({
                message: "Answer doesn't exist"
            })
        }

        if (answer.user !== id) {
            return res.status(401).json({
                message: "You are not authorized to update this answer",
            });
        }

        await answer.update({
            description: description
        })

        return res.status(200).json({
            message: "You have successfully updated an answer",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
})

router.delete("/:id", async (req, res) => {
    const { id: answerId } = req.params;
    const id = token.getIdFromRefreshToken(req.cookies)

    try {
        const answer = await models.Answer.findByPk(answerId);

        if (!answer) {
            return res.status(400).json({
                message: "Answer doesn't exist"
            })
        }

        if (answer.user !== id) {
            return res.status(401).json({
                message: "You are not authorized to delete this answer",
            });
        }

        await answer.destroy();

        return res.status(200).json({
            message: "You have successfully deleted an answer",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
})

module.exports = router