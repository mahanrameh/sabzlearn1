const express = require("express");
const userController = require("../../controller/v1/userControl");
const authWares = require("./../../middleWare/authWares");
const isAdminWares = require("./../../middleWare/isAdmin");

const router = express.Router();

router
    .route('/')
    .get(authWares, isAdminWares, userController.getAll)
    .put(authWares, userController.updateUser);

router
    .route('/delete/:id')
    .delete(authWares, isAdminWares, userController.removeUser);

router
    .route('/role/')
    .put(authWares, isAdminWares, userController.changeRole);


router
    .route('/ban/:id')
    .post(authWares, isAdminWares, userController.banUser);



module.exports = router;