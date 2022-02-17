const express = require("express");
const router = express.Router();
const models = require('../database/models')
const token = require("../helpers/token");
const {where} = require("sequelize");
const findUserByEmail = require("../helpers/findUserByEmail");

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

router.put("/update-information", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = token.getIdFromRefreshToken(req.cookies)

    if (!id) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

    // Prevents assigning used email by another user to the current user

    try {
        const user = await findUserByEmail(email);

        if (user && user.id !== id) {
            return res.status(400).json({
                message: "Email is already in use!"
            })
        }
    } catch (err) {
        console.log(err)
    }

    try {
        const user = await models.User.findByPk(id);

        const updatedUser = await user.update({
            firstName: firstName,
            lastName: lastName,
            email: email
        })

        const response = {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email
        }

        return res.json(response)

    } catch (err) {
        console.log(err)
    }
})


module.exports = router;