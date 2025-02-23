const express =  require("express");
const commentController = require("../../controller/v1/commentControl");
const authWares = require("../../middleWare/authWares");
const isAdmin = require("../../middleWare/isAdmin");

const router = express.Router();

router
    .route('/')
    .post(authWares, commentController.create);


module.exports = router;