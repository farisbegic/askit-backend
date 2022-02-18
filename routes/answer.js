const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");

router.post("/", async (req, res) => {
    const { description, questionId } = req.body
    const id = token.getIdFromRefreshToken(req.cookies)

    try {
        const answer = await models.Answer.create({
            description: description,
            question: questionId,
            user: id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if (answer) {
            res.json({
                message: "You have successfully saved an answer",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
})