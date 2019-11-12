const express = require('express');
const router = express.Router();

const { sayHiToUser, chat } = require('../controller/chatController');

router.route('/')
    .get(sayHiToUser)
    .post(chat);


module.exports = router;
