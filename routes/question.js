const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");
const {Sequelize} = require("sequelize");

router.get("/my-questions/page/:page/size/:size",  async (req, res) => {
    const { page, size } = req.params;
    const id = token.getIdFromRefreshToken(req.cookies)

    const limit = page * size;

    if (!id) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

    try {
        const questions = await models.Question.findAll({
            attributes: ["id", "description", "createdAt"],
            where : {
                user: id
            },
            order: [["id", "ASC"]],
            include: [
                {
                    model: models.User,
                    attributes: ["firstName", "lastName"],
                },
            ],
            limit: limit
        })

        return res.json(questions);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

router.get("/:id", async (req, res) => {
    const { id: questionId } = req.params;
    const id = token.getIdFromRefreshToken(req.cookies)

    try {
        const question = await models.Question.findOne({
            where: {
                id: questionId,
            },
            attributes: [
                "id",
                "description",
                "createdAt",
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "QuestionRatings"
                WHERE "question" = ${questionId} AND "isLike" = true
                )`),
                    "likes",
                ],
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "QuestionRatings"
                WHERE "question" = ${questionId} AND "isLike" = false
                )`),
                    "dislikes",
                ],
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "QuestionRatings"
                WHERE "question" = ${questionId} AND "user" = ${id} AND "isLike" = true
                )`),
                    "hasLiked",
                ],
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "QuestionRatings"
                WHERE "question" = ${questionId} AND "user" = ${id} AND "isLike" = false
                )`),
                    "hasDisliked",
                ],
            ],
            include: [
                {
                    model: models.Answer,
                    attributes: [
                        "id",
                        "description",
                        "createdAt",
                        [
                            Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answers".id AND "isLike" = true
                )`),
                            "likes",
                        ],
                        [
                            Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answers".id AND "isLike" = false
                )`),
                            "dislikes",
                        ],
                        [
                            Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answers".id AND "user" = ${id} AND "isLike" = true
                )`),
                            "hasLiked",
                        ],
                        [
                            Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answers".id AND "user" = ${id} AND "isLike" = false
                )`),
                            "hasDisliked",
                        ],
                    ],
                    include: [
                        {
                            model: models.User,
                            attributes: ["id", "firstName", "lastName"],
                        }
                    ],
                },
                {
                    model: models.User,
                    attributes: ["id", "firstName", "lastName"],
                },
            ],
            order: [[{ model: models.Answer }, "createdAt", "ASC"]],
        });

        if (!question) {
            return res.status(400).json({
                message: "Question doesn't exist."
            })
        }

        return res.json(question);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;