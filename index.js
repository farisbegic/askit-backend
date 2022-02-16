const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()
const port = process.env.PORT || 8000;
require('dotenv').config()

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/authentication", require("./routes/authentication"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})