const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");

router.get("/my-questions/size/:size/page/:page",  async (req, res) => {
    const { size, page } = req.params;
    const id = token.getIdFromRefreshToken(req.cookies)

    const pageLimit = size * page;

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
            limit: pageLimit
        })

        return res.json(questions);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;