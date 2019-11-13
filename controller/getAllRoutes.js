const convertToArray = require('../utils/convertToArray');

const getAllRoutes = (chatObject) => {
   // console.log(`Chat object is--- ${JSON.stringify(chatObject)}`.green.bold);
    let possibleRoutesArray = [];
    let routesQueue = [];
    let routes;
    if(chatObject) {
        for(let chat in chatObject) {
            if(chatObject.hasOwnProperty(chat)) {
                if(chatObject[chat].tag.includes('start')) {
                    routes = convertToArray(chatObject[chat].routes);
                    if(Array.isArray(routes)) {
                        routes.forEach((route) => {
                            routesQueue.push(route);
                        })
                    } else {
                        routesQueue.push(chatObject[chat].routes);
                    }
                }
            }
        }
        while(routesQueue.length) {
            routes = convertToArray(routesQueue.shift());
            if(!possibleRoutesArray.includes(routes)) possibleRoutesArray.push(routes);

            if(chatObject[routes] && chatObject[routes].routes) {
                routes = convertToArray(chatObject[routes].routes);
                if(Array.isArray(routes)) {
                    routes.forEach((route) => {
                        if(!possibleRoutesArray.includes(route)) routesQueue.push(route);
                    });
                } else {
                    if(!possibleRoutesArray.includes(routes)) routesQueue.push(routes);
                }
            }
        }

    }
    console.log(`The possible routes array is ---- ${possibleRoutesArray}`.red.bold);
    return possibleRoutesArray;
};

const getIndexOfEndpoint = (routes, chatObject) => {
    let indicesArr = [];
    for(let i = 0 ; i < routes.length; i++) {
        if (chatObject[routes[i]].stage === 'endpoint') indicesArr.push(i);
    }
    return indicesArr;
};


const isReachedCheckpoint = (chatObject, id) => {
    let checkPointReached = false;
    if(!id) {
        return checkPointReached;
    }
    const routes = getAllRoutes(chatObject);
    if(routes.includes(id)) {
        const itemIndex = routes.indexOf(id);
        const indicesArr = getIndexOfEndpoint(routes, chatObject);
        indicesArr.forEach((index) => {
            if(itemIndex >= index) checkPointReached = true;
        });
    }
    return checkPointReached;
};

module.exports =  {
    getAllRoutes,
    isReachedCheckpoint
};
