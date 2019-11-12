const express = require('express');
const router = express.Router();

const {addData} = require('../controller/addData');
router.route('/')
    .get(addData);


module.exports = router;
