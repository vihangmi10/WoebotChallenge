const convertToArray = require('../utils/convertToArray');
const chatWithUser = require('./chatWithUsers');
const { getWordGameData } = require('../model/data');

const startWordGameWithUsers = (req, res, next) => {
    let message;
    let possibleNextRoutes;
    let payloads;
    let lessonComplete = false;
    let chatComplete = false;
    let nextPossibleReply = "";
    const wordGameData = getWordGameData();
    for(let chat in wordGameData) {
        if(wordGameData.hasOwnProperty(chat)) {
            const chatDetails = wordGameData[chat];
            if(chatDetails.tag === 'allornothing-start') {
                message = chatDetails.text;
                possibleNextRoutes = convertToArray(chatDetails.routes);
                payloads = convertToArray(chatDetails.payloads);
                if(chatDetails.stage === 'endpoint') lessonComplete = true;
                if(chatDetails.payloads === 'bye') chatComplete = true;
                nextPossibleReply = convertToArray(chatDetails.replies);
            }
        }
    }
    res.status(200).json({
        success: true,
        message,
        possibleNextRoutes,
        payloads,
        nextPossibleReply,
        lessonComplete,
        chatComplete
    })
};
const playWordGame =  (req, res, next) => {
    const chatBotData = getWordGameData();
    const resp = chatWithUser(req, chatBotData);

    res.status(200).json({ success: true,
        resp});
};
module.exports = {
    startWordGameWithUsers,
    playWordGame
};
