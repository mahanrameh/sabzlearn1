const express = require("express");
const catControl = require("./../../controller/v1/categorycontrol");
const authWares = require("../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");

const router = express.Router();

router
    .route('/')
    .post(authWares, isAdmin, catControl.create)
    .get(catControl.getAll);


router
    .route('/:id')
    .delete(authWares, isAdmin, catControl.remove)
    .put(authWares, isAdmin, catControl.update);



module.exports = router;