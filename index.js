const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()
const port = process.env.PORT || 8000;
require('dotenv').config()

app.use(cors({
    origin: process.env.NODE_ENV ? process.env.FRONTEND_APP_URL : true,
    credentials: true
}));

app.set("trust proxy", 1);

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})