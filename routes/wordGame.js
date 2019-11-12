const express = require('express');
const router = express.Router();

const { startWordGameWithUsers, playWordGame } = require('../controller/wordGameController');

router.route('/')
    .get(startWordGameWithUsers)
    .post(playWordGame);


module.exports = router;
