const fs = require('fs');

const {
    addDataToChatObject,
    addDataToWordGameObject
} = require('../model/data');

const readData = () => {
    const chatPath = __dirname + '/../labels.json';
    const wordGamePath = __dirname +'/../allornothing.json';
    return {
        chatData: JSON.parse(fs.readFileSync(chatPath), 'utf-8'),
        wordGameData: JSON.parse(fs.readFileSync(wordGamePath), 'utf-8')
    };
};

const addData =  async (req, res, next) => {
    try {
        const { chatData, wordGameData } = readData();
        const chatDataObject = await addDataToChatObject(chatData);
       const wordDataObject =  await addDataToWordGameObject(wordGameData);
       res.status(200).json({
           success: true,
           chatData: chatDataObject,
           wordData: wordDataObject
       })

    } catch(e) {
        res.status(500).json({
            success: false,
            error: e
        })
    }

    // const chatData = readData();
    //
    // const resp = addDataToChatObject(chatData);
    // if(resp.success) {
    //     return res.status(200).json({
    //         success: resp.success,
    //         data: chatData
    //     })
    // }
    // res.status(500).json({
    //     error: resp.error
    // })
};

module.exports =  {
    addData
};
