const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");
const {Sequelize} = require("sequelize");


// Fetch Hot Questions or questions with most likes
router.get("/most-likes", async (req, res) => {

    try {
        const questions = await models.Question.findAll({
            attributes: [
                "id",
                "description",
                [Sequelize.fn("COUNT", Sequelize.col("QuestionRatings.id")), "count"],
            ],
            include: {
                model: models.QuestionRating,
                attributes: [],
                where: {
                    isLike: true,
                },
            },
            group: ["Question.id"],
            order: [['"count"', "DESC"]],
        })

        return res.json(questions);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

// Fetch my questions with load more functionality
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

// Fetch a question by id including all details
router.get("/:id", async (req, res) => {
    const { id: questionId } = req.params;
    const id = token.getIdFromRefreshToken(req.cookies)

    if (!id) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

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

// Fetch newest question with load more functionality
router.get("/page/:page/size/:size", async(req, res) => {
    const { page, size } = req.params;
    const limit = page * size;

    try {
        const questions = await models.Question.findAll({
            attributes: ["id", "description", "createdAt"],
            order: [["id", "DESC"]],
            include: [
                {
                    model: models.User,
                    attributes: ["firstName", "lastName"],
                },
            ],
            limit: limit,
        });

        return res.json(questions)

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

router.post("/", async (req, res) => {
    const { description } = req.body;
    const id = token.getIdFromRefreshToken(req.cookies)

    if (!id) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

    try {
        const newQuestion = await models.Question.create({
            description: description,
            user: id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return res.json(newQuestion);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;