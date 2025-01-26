const express = require("express");
const userController = require("../../controller/v1/userControl");

const router = express.Router();


router.route('/ban/:id').post(userController.banUser);



module.exports = router