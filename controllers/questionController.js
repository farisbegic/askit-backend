const models = require("../database/models");
const {Sequelize, Op} = require("sequelize");
const token = require("../helpers/token");

const getQuestionsWithMostLikes = async (req, res) => {
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
}

const getUserQuestions = async (req, res) => {
    const { page, size } = req.params;
    const id = res.locals.id
    const limit = page * size;

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
                    attributes: ["id","firstName", "lastName"],
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
}

const getQuestionDetails = async (req, res) => {
    const { id: questionId } = req.params;
    const id = res.locals.id

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
                    model: models.User,
                    attributes: ["id", "firstName", "lastName"],
                }
            ]
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
}

const getNewestQuestions = async (req, res) => {
    const { page, size } = req.params;
    const limit = page * size;

    try {
        const questions = await models.Question.findAll({
            attributes: ["id", "description", "createdAt"],
            order: [["id", "DESC"]],
            include: [
                {
                    model: models.User,
                    attributes: ["id", "firstName", "lastName"],
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
}

const saveQuestion = async (req, res) => {
    const { description } = req.body;
    const id = res.locals.id

    try {
        const newQuestion = await models.Question.create({
            description: description,
            user: id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if (newQuestion) {
            return res.json({
                message: "Successfully added new question"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteQuestion = async (req, res) => {
    const { id: questionId } = req.params;
    const id = res.locals.id

    try {
        const question = await models.Question.findByPk(questionId)

        if (!question) {
            return res.status(400).json({
                message: "Question doesn't exist"
            })
        }

        if (question.user !== id) {
            return res.status(401).json({
                message: "You are not authorized"
            })
        }

        await question.destroy();

        return res.json({
            message: "You have successfully deleted a question"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateQuestion = async (req, res) => {
    const { id: questionId, description } = req.body;
    const id = res.locals.id

    try {
        const question = await models.Question.findByPk(questionId)

        if (!question) {
            return res.status(400).json({
                message: "Question doesn't exist"
            })
        }

        if (question.user !== id) {
            return res.status(401).json({
                message: "You are not authorized to update this question",
            });
        }

        await question.update({
            description: description,
        })

        return res.json({
            message: "Question has been updated successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const searchQuestion = async (req, res) => {
    const { description } = req.params;

    try {
        const question = await models.Question.findAll({
            attributes: ["id", "description", "createdAt"],
            where: {
                description: { [Op.iLike]: '%' + description + '%'}
            }
        })

        return res.json(question)
    } catch (err) {
        return res.json({
            message: err.message
        })
    }

}

module.exports = {
    getQuestionsWithMostLikes,
    getUserQuestions,
    getQuestionDetails,
    getNewestQuestions,
    saveQuestion,
    deleteQuestion,
    updateQuestion,
    searchQuestion
}