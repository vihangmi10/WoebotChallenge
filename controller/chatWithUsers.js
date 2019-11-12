const converToArray = require('../utils/convertToArray');

const getDetailForAllRoutes = (possibleNextRoutesArr, chatObject) => {
    let tmpMessageArr = [];
    let tmpRouteArr = [];
    let tmpPayloadArr = [];
    let tmpNextPossibleReplyArr = [];
    possibleNextRoutesArr.forEach((route) => {
        tmpMessageArr.push(chatObject[route].text);
        if(chatObject[route].routes) {
            tmpRouteArr.push(converToArray(chatObject[route].routes));
        }
        if(chatObject[route].payloads) {
            tmpPayloadArr.push(converToArray(chatObject[route].payloads));
        }
        tmpNextPossibleReplyArr.push(converToArray(chatObject[route].replies));
        if(chatObject[route].stage === 'endpoint') lessonComplete = true;
    });
    return {
        allPossibleMessages: tmpMessageArr,
        allPossibleNextRoutes: tmpRouteArr,
        allPossiblePayloads: tmpPayloadArr,
        nextPossibleReplies: tmpNextPossibleReplyArr
    }
};


const chatWithUsers = (req, chatObject) => {
  const { reply, payloads, possibleNextRoutes } =  req.body ;

  let message;
  let resPayloads = "";
  let nextRoutes;
  let lessonComplete = false;
  let chatComplete = false;
  let nextPossibleReply = "";

  if(possibleNextRoutes) {
      if(Array.isArray(possibleNextRoutes)) {
          if(payloads) {
              let chatDetails;
              switch(payloads) {
                  case ('yes' || '1' || 'good'):
                      chatDetails = possibleNextRoutes[0] ? chatObject[possibleNextRoutes[0]] : null;
                      break;
                  case ('no' || '2' || 'bad'):
                      chatDetails = possibleNextRoutes[1] ? chatObject[possibleNextRoutes[1]] : null;
                      break;
                  case '3':
                      chatDetails = possibleNextRoutes[2] ? chatObject[possibleNextRoutes[2]] : null;
                      break;
                  case ('4' || 'huh'):
                      chatDetails = possibleNextRoutes[3] ? chatObject[possibleNextRoutes[3]] : null;
                      break;
                  default:
                      chatDetails = possibleNextRoutes[0] ? chatObject[possibleNextRoutes[0]] : null;
              }
              message = chatDetails.text;
              nextRoutes = converToArray(chatDetails.routes);
              resPayloads = converToArray(chatDetails.payloads);
              if(chatDetails.stage === 'endpoint') lessonComplete = true;
              nextPossibleReply = converToArray(chatDetails.replies);

          } else {
             const resp = getDetailForAllRoutes(possibleNextRoutes, chatObject);
             message = resp.allPossibleMessages;
             nextRoutes = resp.allPossibleNextRoutes;
             resPayloads = resp.allPossiblePayloads.length !== 0 ? resp.allPossiblePayloads : resPayloads;
             nextPossibleReply = resp.nextPossibleReplies;
          }
      } else {
          message = chatObject[possibleNextRoutes].text;
          if(chatObject[possibleNextRoutes].payloads !== "") {
              resPayloads = converToArray(chatObject[possibleNextRoutes].payloads);
          }
          nextRoutes = converToArray(chatObject[possibleNextRoutes].routes);
          nextPossibleReply = chatObject[possibleNextRoutes].replies;
          if(chatObject[possibleNextRoutes].stage === 'endpoint') lessonComplete = true;

      }
  } else {
      if(payloads === 'bye') {
        chatComplete = true;
      }
      for(let chat in chatObject) {
          if(chatObject.hasOwnProperty(chat)) {
              let chatDetails = chatObject[chat];
              if(chatDetails.replies.includes('|'))  {
                  const replyArr = converToArray(chatDetails.replies);

                  replyArr.forEach((usersReply) => {
                      if(reply === usersReply){
                          message = chatDetails.text;
                          resPayloads = converToArray(chatDetails.payloads);
                          nextPossibleReply = converToArray(chatDetails.replies);
                          nextRoutes = converToArray(chatDetails.routes);
                      }
                  });
              }
              if(reply === chatDetails.replies) {
                  if(chatDetails.stage === 'endpoint') lessonComplete = true;
                  if(chatDetails.payloads === 'bye') chatComplete = true;
                  nextRoutes = converToArray(chatDetails.routes);

                  if(Array.isArray(nextRoutes)) {
                      const resp = getDetailForAllRoutes(possibleNextRoutes, chatObject);
                      message = resp.allPossibleMessages;
                      nextRoutes = resp.allPossibleNextRoutes;
                      resPayloads = resp.allPossiblePayloads.length !== 0 ? resp.allPossiblePayloads : resPayloads;
                      nextPossibleReply = resp.nextPossibleReplies;
                  } else {
                      message = chatObject[nextRoutes].text;
                      resPayloads = converToArray(chatObject[nextRoutes].payloads);
                      nextPossibleReply = chatObject[nextRoutes].replies;
                      nextRoutes = converToArray(chatObject[nextRoutes].routes);
                  }
              }
          }

      }
      if(!message && !chatComplete) {
         message = 'Sorry I couldn\'t quite understand. Please try something else.';
         nextRoutes = '';
         resPayloads = '';
      }
  }

  return {
      message,
      nextRoutes,
      resPayloads,
      nextPossibleReply,
      lessonComplete,
      chatComplete
  }
};

module.exports = chatWithUsers;
