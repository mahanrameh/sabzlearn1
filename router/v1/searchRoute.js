const express = require("express");
const searchController = require("./../../controller/v1/searchControl");

const router = express.Router();

router
    .route('/:keyword')
    .get(searchController.getResult);




module.exports = router;