const express = require("express");
const notificationController = require("./../../controller/v1/notificationControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");

const router = express.Router();


router
    .route('/')
    .post(authWares, isAdmin, notificationController.create)
    .get(authWares, isAdmin, notificationController.getAll);

router
    .route('/admin')
    .get(authWares, isAdmin, notificationController.getMessage);

router
    .route('/:id/delete')
    .delete(authWares, isAdmin, notificationController.deleteMessage);

router
    .route('/:id/see')
    .put(authWares, isAdmin, notificationController.seenMessage);




module.exports = router;