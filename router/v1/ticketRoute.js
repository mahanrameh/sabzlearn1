const express = require("express");
const ticketController = require("../../controller/v1/ticketControl");
const authWares = require("./../../middleWare/authWares");
const isAdmin = require("./../../middleWare/isAdmin");

const router = express.Router();

router
    .route('/')
    .post(authWares, ticketController.create)
    .get(authWares, isAdmin, ticketController.getAll);

router
    .route('/user')
    .get(authWares, ticketController.userTicket);

router 
    .route('/department')
    .post(authWares, isAdmin, ticketController.createDepartment)
    .get(ticketController.department);

router
    .route('/sub_department')
    .post(authWares, isAdmin, ticketController.createSubDepartment);
    
router 
    .route('/department/:id/sub')
    .get(ticketController.sub_department);
    
router
    .route('/answer')
    .post(authWares, isAdmin, ticketController.setAnswer);

router
    .route('/:id/answer')
    .get(authWares, ticketController.getAnswer);





module.exports = router;