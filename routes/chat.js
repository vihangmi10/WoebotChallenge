const express = require('express');
const router = express.Router();

const { sayHiToUser, chat, getAllPossibleRoutes, isReachedEndpoint } = require('../controller/chatController');

router.route('/')
    .get(sayHiToUser)
    .post(chat);

router.route('/routes')
    .get(getAllPossibleRoutes);
router.route('/reachedCheckpoint')
    .get(isReachedEndpoint);

module.exports = router;
