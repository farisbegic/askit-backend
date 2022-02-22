const token = require("../helpers/token");
const models = require("../database/models");
const {Sequelize} = require("sequelize");

const saveAnswer = async (req, res) => {
    const { description, questionId } = req.body
    const id = res.locals.id

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
}

const updateAnswer = async (req, res) => {
    const { id: answerId, description } = req.body;
    const id = res.locals.id

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
}

const deleteAnswer = async (req, res) => {
    const { id: answerId } = req.params;
    const id = res.locals.id

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
}

const getAnswersForQuestion = async (req, res) => {
    const { id: questionId } = req.params;
    const id = res.locals.id

    try {
        const answers = await models.Answer.findAll({
            where: {
                question: questionId
            },
            attributes: ["id", "description", "createdAt",
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answer".id AND "isLike" = true
                )`),
                    "likes",
                ],
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answer".id AND "isLike" = false
                )`),
                    "dislikes",
                ],
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answer".id AND "user" = ${id} AND "isLike" = true
                )`),
                    "hasLiked",
                ],
                [
                    Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "AnswerRatings"
                WHERE "answer" = "Answer".id AND "user" = ${id} AND "isLike" = false
                )`),
                    "hasDisliked",
                ],
            ],
            include: [{
                model: models.User,
                attributes: ["id", "firstName", "lastName"]
            }, {
                model: models.AnswerRating,
                attributes: []
            }],
            order: [["createdAt", "ASC"]]
        })

        return res.json(answers);

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    saveAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswersForQuestion
}