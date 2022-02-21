const token = require("../helpers/token");
const models = require("../database/models");

const saveQuestionRating = async (req, res) => {
    const { id: questionId, isLike } = req.body;
    const id = res.locals.id

    try {
        const questionrating = await models.QuestionRating.findOne({
            where: {
                user: id,
                question: questionId
            }
        })

        if (questionrating) {
            return res.json({
                message: "Error. Rating already exists."
            })
        }

        await models.QuestionRating.create({
            user: id,
            question: questionId,
            isLike: isLike,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return res.json({
            message: "You have successfully added question rating"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateQuestionRating = async (req, res) => {
    const { id: questionId, isLike } = req.body;
    const id = res.locals.id

    try {
        const questionrating = await models.QuestionRating.findOne({
            where: {
                user: id,
                question: questionId
            }
        });

        if (!questionrating) {
            return res.status(400).json({
                message: "Question Rating doesn't exist"
            })
        }

        if (questionrating.user !== id) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        await questionrating.update({
            isLike: isLike
        })

        return res.json({
            message: "Question Rating has been updated successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteQuestionRating = async (req, res) => {
    const { id: questionId } = req.params;
    const id = res.locals.id

    try {
        const questionrating = await models.QuestionRating.findOne({
            where: {
                user: id,
                question: questionId
            }
        });

        if (!questionrating) {
            return res.status(400).json({
                message: "Question Rating with that ID doesn't exist"
            })
        }

        if (questionrating.user !== id) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        await questionrating.destroy();

        return res.json({
            message: "Question Rating has been deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    saveQuestionRating,
    updateQuestionRating,
    deleteQuestionRating
}