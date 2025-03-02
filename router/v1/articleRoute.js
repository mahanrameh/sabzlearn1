const express = require("express");
const articleController = require("./../../controller/v1/articleControl");
const authWares = require("../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");
const multer = require("multer");
const multerStorage = require("./../../utils/uploader");

const router = express.Router();

router
    .route('/')
    .post(
        authWares, isAdmin,
        multer({storage: multerStorage, limits: {fileSize: 1000000000}}).single('cover'),
         articleController.create)
    .get(articleController.getAll);

router
    .route('/:href')
    .get(articleController.getOne);

router
    .route('/category/:href')
    .get(articleController.getByCategory);

router
    .route('/:id')
    .delete(authWares, isAdmin, articleController.delete);

router
    .route('/update/:id')
    .put(
        authWares, isAdmin,
        multer({storage: multerStorage, limits: {fileSize: 1000000000}}).single('cover'),
        articleController.update
    );

router
    .route('/publish/:id')
    .put(authWares, isAdmin, articleController.publish);





module.exports = router;