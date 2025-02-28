const express = require("express");
const newsController = require("./../../controller/v1/newsControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");

const router = express.Router();


router
    .route('/')
    .get(authWares, isAdmin, newsController.getAll)
    .post(newsController.create);



module.exports = router;