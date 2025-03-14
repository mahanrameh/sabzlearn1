const express = require("express");

const controller = require("../../controller/v1/authControl");

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', controller.getMe);

module.exports = router;