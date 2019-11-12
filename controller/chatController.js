const { getChatBotData } = require('../model/data');
const converToArray = require('../utils/convertToArray');
const chatWithUser = require('./chatWithUsers');
const sayHiToUser =  (req, res, next) => {
    let message;
    let possibleNextRoutes;
    let resPayloads;
    let lessonComplete = false;
    let chatComplete = false;
    let nextPossibleReply = "";
    const chatBotData = getChatBotData();
    for(let chat in chatBotData) {
        if(chatBotData.hasOwnProperty(chat)) {
            const chatDetails = chatBotData[chat];
            if(chatDetails.tag === 'labels-start') {
                message = chatDetails.text;
                possibleNextRoutes = converToArray(chatDetails.routes);
                resPayloads = converToArray(chatDetails.payloads);
                if(chatDetails.stage === 'endpoint') lessonComplete = true;
                if(chatDetails.resPayloads === 'bye') chatComplete = true;
                nextPossibleReply = chatDetails.replies;
            }
        }
    }


    res.status(200).json({
        success: true,
        message,
        possibleNextRoutes,
        resPayloads,
        nextPossibleReply,
        lessonComplete,
        chatComplete
    })
};
const chat =  (req, res, next) => {
    const chatBotData = getChatBotData();
    const resp = chatWithUser(req, chatBotData);

    res.status(200).json({ success: true,
        resp});
};
module.exports = {
    sayHiToUser,
    chat
};
