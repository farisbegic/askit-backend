const models = require("../database/models");
const token = require("../helpers/token");
const findUserByEmail = require("../helpers/findUserByEmail");
const bcrypt = require("bcryptjs");
const {Sequelize} = require("sequelize");

const getUser = async (req, res) => {
    const id = res.locals.id

    try {
        const user = await models.User
            .findOne({
                where: {
                    id: id
                },
                attributes: ['id', 'firstName', 'lastName', 'email']
            })

        if (!user) {
            return res.status(500).json({
                message: "User not found."
            })
        }

        return res.json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = res.locals.id

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
}

const updatePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const id = res.locals.id

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match."
        })
    }

    try {
        const user = await models.User.findByPk(id);

        await user.update({
            password: bcrypt.hashSync(password, 8)
        })

        res.json({
            message: "Password has been updated successfully"
        })

    } catch (err) {
        console.log(err)
    }
}

const getUsersWithMostAnswers = async (req, res) => {
    try {
        const users = await models.User.findAll({
            attributes: [
                "id",
                "firstName",
                "lastName",
                [Sequelize.fn("COUNT", Sequelize.col("Answers.id")), "count"],
            ],
            include: {
                model: models.Answer,
                attributes: []
            },
            group: ["User.id"],
            order: [['"count"', "DESC"]],
        })

        return res.json(users)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    getUser,
    updateUser,
    updatePassword,
    getUsersWithMostAnswers
}