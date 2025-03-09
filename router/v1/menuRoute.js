const express = require("express");
const menuController = require("./../../controller/v1/menuControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");

const router = express.Router();


router
    .route('/')
    .post(authWares, isAdmin, menuController.create)
    .get(menuController.getAll);

router
    .route('/all')
    .get(authWares, isAdmin, menuController.getAllPanel);

router
    .route('/:id')
    .delete(authWares, isAdmin, menuController.delete);





module.exports = router;