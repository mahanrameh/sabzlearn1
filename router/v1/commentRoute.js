const express =  require("express");
const commentController = require("../../controller/v1/commentControl");
const authWares = require("../../middleWare/authWares");
const isAdmin = require("../../middleWare/isAdmin");

const router = express.Router();

router
    .route('/')
    .post(authWares, commentController.create)
    .get(authWares, isAdmin, commentController.getAll);

router
    .route('/:id')
    .delete(authWares, isAdmin, commentController.delete);

router
    .route('/:id/accept')
    .put(authWares, isAdmin, commentController.accept);

router
    .route('/:id/reject')
    .put(authWares, isAdmin, commentController.reject);

router
    .route('/:id/answer')
    .post(authWares, isAdmin, commentController.answer);


module.exports = router;