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
        origin: true,
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


app.enable('trust proxy');
app.set("socketio", io)

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://ask-it-frontend.herokuapp.com/']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

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