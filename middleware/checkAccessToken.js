const token = require("../helpers/token")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(401).json({
            message: "Unauthorized!"
        })
    }
    const accessToken = authHeader.split(" ")[1];
    const { id } = token.verifyAccessToken(accessToken)
    res.locals.id = id;

    next()
}