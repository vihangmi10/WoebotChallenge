const { getChatBotData, getWordGameData } = require('../model/data');
const converToArray = require('../utils/convertToArray');
const chatWithUser = require('./chatWithUsers');
const { getAllRoutes, isReachedCheckpoint } = require('./getAllRoutes');

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
const getAllPossibleRoutes = (req, res, next) => {
    let chatBotData;
    const lesson = req.query.lesson;
    if(lesson === 'labels') {
        chatBotData = getChatBotData();
    } else {
         chatBotData = getWordGameData();
    }
    //console.log(`Chat bot data in controller is --- ${JSON.stringify(chatBotData)}`.cyan.bold);
   const resp =  getAllRoutes(chatBotData);
    res.status(200).json({ success: true, resp });
};

const isReachedEndpoint = (req,res,next) => {
    let chatBotData;
    const lesson = req.query.lesson;
    const id = req.query.id;
    if(!id) {
        return res.status(400).json({
            success: false,
            error: 'Please submit an id along with lesson. Default lesson is all or nothing'
        });
    }
    if(lesson === 'labels') {
        chatBotData = getChatBotData();
    } else {
        chatBotData = getWordGameData();
    }
    const resp = isReachedCheckpoint(chatBotData, id);
    res.status(200).json({
        success: true,
        checkpointReached: resp
    });
};
module.exports = {
    sayHiToUser,
    chat,
    getAllPossibleRoutes,
    isReachedEndpoint
};
