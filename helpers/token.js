const jwt = require("jsonwebtoken");
const signAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {
        expiresIn: "10min",
    });
};

const signRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
        expiresIn: "15d",
    });
};

const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.ACCESS_SECRET);
};

const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};