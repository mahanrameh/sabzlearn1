const express = require("express");
const authRouter = require("./router/v1/authRoute");
const userRouter = require("./router/v1/userRoute");
const categoryRouter = require("./router/v1/categoryRoute");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");



const app = express();


app.use('/courses/cover', express.static(path.join(__dirname, 'public', 'courses', 'cover')));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/v1/auth', authRouter);
app.use('/v1/user', userRouter);
app.use('/v1/category', categoryRouter);



module.exports = app;