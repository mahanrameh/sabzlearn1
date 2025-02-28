const express = require("express");
const contactController = require("./../../controller/v1/contactControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");

const router = express.Router();

router
    .route('/')
    .get(authWares, isAdmin, contactController.getAll)
    .post(authWares, contactController.create)

router
    .route('/answer')
    .post(contactController.answer);
    
router
    .route('/:id')
    .delete(contactController.remove);



module.exports = router;