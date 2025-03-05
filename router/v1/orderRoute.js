const express = require("express");
const orderController = require("./../../controller/v1/orderControl");
const authWares = require("../../middleWare/authWares");


const router = express.Router();

router
    .route('/')
    .get(authWares, orderController.getAll);

router
    .route('/:id')
    .get(authWares, orderController.getOne);



module.exports = router;