const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");

router.get("/", async (req, res) => {
    const id = token.getIdFromRefreshToken(req.cookies)

    if (!id) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

    const user = await models.User
        .findOne({
            where: {
                id: id
            },
            attributes: ['id', 'firstName', 'lastName', 'email']
        })

    if (!user) {
        return res.status(500).json({
            message: err.message
        })
    }

    return res.json(user);
})

module.exports = router;