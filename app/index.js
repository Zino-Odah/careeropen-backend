const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream')
const mongoose = require("mongoose")
const morgan = require("morgan")
const app = express();

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/userRoutes');

// create a rotating write stream
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})


app.use(logger('combine', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;

var cors = require("cors");

const { userRouter } = require("../routes/userRoutes");

const dbURI =
    "mongodb+srv://zinoodah:trwmabQdv9gmBKNS@careeropen.izfhj0k.mongodb.net";

mongoose
    .connect(dbURI, {})
    .then((res) => {
        start();
    })
    .catch((err) => console.error(err));

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.status(201).json({ message: "Lets Go" }));
app.use("/api", userRouter);

app.use((req, res, next) => {
    res.status(404).json({
        msg: "General Error: Sorry this page Cannot be found",
    });
});

const start = () => {
    app.listen(1234, () => {
        console.log("Server listening on port 1234....");
    });
};

