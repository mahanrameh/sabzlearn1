const express = require("express");
const courseController = require("./../../controller/v1/courseControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");
const multer = require("multer");
const multerStorage = require("./../../utils/uploader");


const router = express.Router();

router
    .route("/")
    .get(authWares, isAdmin, courseController.getAll)
    .post(
         authWares, isAdmin,
         multer({storage: multerStorage, limits: {fileSize: 1000000000}}).single('cover'),
         courseController.create);

router
    .route('/info/:href')
    .get(authWares, courseController.getCourseInfo);         

router
    .route('/related/:href')
    .get(courseController.getRelated);

router 
    .route('/category/:href')
    .get(courseController.getCourse);         

router
    .route('/:id')
    .delete(authWares, isAdmin, courseController.deleteCourse);
  
router
    .route('/:id/session')
    .post(
        //  multer({storage: multerStorage, limits: {fileSize:10000*10000}}).single('video'),
         authWares, isAdmin,
         courseController.createSession);

router
    .route('/:id/register')
    .post(authWares, courseController.register);

router
    .route('/session')
    .get(authWares, isAdmin, courseController.getallSession);

router
    .route('/session/:id')
    .delete(authWares, isAdmin, courseController.deleteSession);

router
    .route('/session/:href/:sessionID')
    .get(courseController.getSessionInfo);

router
    .route('/popular')
    .get(courseController.popularCourse);

router
    .route('/presell')
    .get(courseController.presellCourse);


 

module.exports = router;

    