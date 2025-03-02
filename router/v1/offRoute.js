const express = require("express");
const offController = require("./../../controller/v1/offControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");


const router = express.Router();

router
    .route('/')
    .post(authWares, isAdmin, offController.create)
    .get(authWares, isAdmin, offController.getAll);

router
    .route('/offAll')
    .post(authWares, isAdmin, offController.offOnAll);

router
    .route('/:code')
    .post(authWares, isAdmin, offController.getOne);

router
    .route('/:id/delete')
    .delete(authWares, isAdmin, offController.delete);





module.exports = router;