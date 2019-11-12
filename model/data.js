let chatObject = {};
let wordGameObject = {};

const addDataToChatObject = (chatData) => {
    return new Promise((resolve, reject) => {
        if(!chatData) {
            reject('Error no data available from labels.json'.red.bold);
        }
        if(Object.keys(chatObject).length !== 0) {
            console.log('Data already present in the chat object'.green.bold);
            resolve('Data already present in the object');
        }
        chatObject = chatData;
        console.log('Data added to chat object successfully'.yellow.bold);
        resolve(chatObject);
    })

};

const addDataToWordGameObject = (wordGameData) => {
    return new Promise((resolve, reject) => {
        if(!wordGameData) {
            reject('Error no data available from allornothing.json'.red.bold);
        }
        if(Object.keys(wordGameObject).length !== 0) {
            console.log('Data already present in the word game object'.green.bold);
            resolve('Data already present in the word game object');
        }
        wordGameObject = wordGameData;
        console.log('Data added to word game object successfully'.yellow.bold);
        resolve(wordGameObject);
    })
};
const getChatBotData = () => {
    return chatObject;
};
const getWordGameData = () => {
    return wordGameObject;
};
module.exports = {
    addDataToChatObject,
    addDataToWordGameObject,
    getChatBotData,
    getWordGameData
};
