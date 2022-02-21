const models = require("../database/models");
const token = require("../helpers/token");

const saveAnswerRating = async (req, res) => {
    const { id: answerId, isLike } = req.body;
    const id = res.locals.id

    try {
        const answerrating = await models.AnswerRating.findOne({
            where: {
                user: id,
                answer: answerId
            }
        })

        if (answerrating) {
            return res.json({
                message: "Error. Rating already exists."
            })
        }

        await models.AnswerRating.create({
            user: id,
            answer: answerId,
            isLike: isLike,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return res.json({
            message: "You have successfully added answer rating"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateAnswerRating = async (req, res) => {
    const { id: answerId, isLike } = req.body;
    const id = res.locals.id

    try {
        const answerrating = await models.AnswerRating.findOne({
            where: {
                user: id,
                answer: answerId
            }
        });

        if (!answerrating) {
            return res.status(400).json({
                message: "Answer Rating doesn't exist"
            })
        }

        await answerrating.update({
            isLike: isLike
        })

        return res.json({
            message: "Answer Rating has been updated successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteAnswerRating = async (req, res) => {
    const { id: answerId } = req.params;
    const id = res.locals.id

    try {
        const answerrating = await models.AnswerRating.findOne({
            where: {
                user: id,
                answer: answerId
            }
        });

        if (!answerrating) {
            return res.status(400).json({
                message: "Answer Rating with that ID doesn't exist"
            })
        }

        await answerrating.destroy();

        return res.json({
            message: "Answer Rating has been deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    saveAnswerRating,
    updateAnswerRating,
    deleteAnswerRating
}