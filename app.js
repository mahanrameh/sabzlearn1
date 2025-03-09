const express = require("express");
const authRouter = require("./router/v1/authRoute");
const userRouter = require("./router/v1/userRoute");
const categoryRouter = require("./router/v1/categoryRoute");
const courseRouter = require("./router/v1/courseRoute");
const commentRouter = require("./router/v1/commentRoute");
const contactRouter = require("./router/v1/contactRoute");
const newsRouter = require("./router/v1/newsRoute");
const searchRouter = require("./router/v1/searchRoute");
const notificationRouter = require("./router/v1/notificationRoute");
const offRouter = require("./router/v1/offRoute");
const articleRouter = require("./router/v1/articleRoute");
const orderRouter = require("./router/v1/orderRoute");
const ticketRouter = require("./router/v1/ticketRoute");
const menuRouter = require("./router/v1/menuRoute");
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
app.use('/v1/course', courseRouter);
app.use('/v1/comment', commentRouter);
app.use('/v1/category', categoryRouter);
app.use('/v1/contact', contactRouter);
app.use('/v1/newsLetter', newsRouter);
app.use('/v1/search', searchRouter);
app.use('/v1/notification', notificationRouter);
app.use('/v1/off', offRouter);
app.use('/v1/article', articleRouter);
app.use('/v1/order', orderRouter);
app.use('/v1/ticket', ticketRouter);
app.use('/v1/menu', menuRouter);



module.exports = app;