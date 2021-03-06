const findUserByEmail = require("../helpers/findUserByEmail");
const bcrypt = require("bcryptjs");
const token = require("../helpers/token");
const models = require("../database/models");
const cookieSettings = require("../helpers/cookieSettings");

const login = async (req, res) => {
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

        res.cookie('refreshToken', refreshToken, cookieSettings);

        res.json({
            id: user.id,
            accessToken: accessToken
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const register = async (req, res) => {
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

        res.cookie('refreshToken', refreshToken, cookieSettings);

        res.json({
            id: user.id,
            accessToken: accessToken
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        res.status(401).json({
            message: "Unauthorized!"
        })
    }

    try {
        const { id } = token.verifyRefreshToken(refreshToken);
        const user = await models.User.findByPk(id);

        if (bcrypt.compareSync(refreshToken, user.refreshToken)) {
            const accessToken = token.signAccessToken(user.id);
            res.json({
                id: user.id,
                accessToken: accessToken
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const logout = async (req, res) => {
    const { refreshToken } = req.cookies;

    try {
        const { id } = token.verifyRefreshToken(refreshToken);
        const user = await models.User.findByPk(id);

        if (bcrypt.compareSync(refreshToken, user.refreshToken)) {
            user.update({
                refreshToken: null
            })

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            res.json({
                message: "You have been logged out."
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    login,
    register,
    getAccessToken,
    logout
}