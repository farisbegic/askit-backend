const express = require("express");
const router = express.Router();
const models = require('../database/models')
const bcrypt = require("bcryptjs");
const findUserByEmail = require("../helpers/findUserByEmail")
const token = require("../helpers/token")

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All input fields are required"
        })
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Invalid email."
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                message: "Incorrect password."
            })
        }

        const accessToken = token.signAccessToken(user.id);
        const refreshToken = token.signRefreshToken(user.id);

        user.update({ refreshToken: bcrypt.hashSync(refreshToken, 8)})

        res.cookie('refreshToken', refreshToken, {httpOnly: true});

        res.json({
            accessToken: accessToken
        })
    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: "All input fields are required"
        })
    }

    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists."
            })
        }

        const user = await models.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, 8)
        })

        const accessToken = token.signAccessToken(user.id);
        const refreshToken = token.signRefreshToken(user.id);

        user.update({ refreshToken: bcrypt.hashSync(refreshToken, 8)})

        res.cookie('refreshToken', refreshToken, {httpOnly: true});

        res.json({
            accessToken: accessToken
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;