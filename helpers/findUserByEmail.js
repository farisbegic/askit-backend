const models = require("../database/models")

module.exports = async (email) => {
    return await models.User.findOne({
        where: {
            email: email
        }
    });
}