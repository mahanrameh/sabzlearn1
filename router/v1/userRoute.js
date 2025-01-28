const express = require("express");
const userController = require("../../controller/v1/userControl");
const authWares = require("./../../middleWare/authWares");
const isAdminWares = require("./../../middleWare/isAdmin");

const router = express.Router();


router
.route('/ban/:id')
.post(authWares, isAdminWares, userController.banUser);



module.exports = router