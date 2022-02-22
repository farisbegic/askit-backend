const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const token = require('./helpers/token')
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config()

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV ? process.env.FRONTEND_APP_URL : "http://localhost:3000",
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.on("join", (accessToken) => {
        try {
            const { id } = token.verifyAccessToken(accessToken);
            socket.join(id);
        } catch {
            socket.disconnect()
        }
    })
});

app.set("socketio", io)
app.set('trust proxy', 1)

app.use(cors({
    origin: process.env.NODE_ENV ? process.env.FRONTEND_APP_URL : "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/authentication", require("./routes/authentication"));
app.use("/user", require("./routes/user"));
app.use("/question", require("./routes/question"))
app.use("/answer", require("./routes/answer"))
app.use("/questionrating", require("./routes/questionrating"))
app.use("/answerrating", require("./routes/answerrating"))


// Invalid route
app.use(async (req, res) => {
    await res.status(404).send(`Route is no where to be found.`);
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT)