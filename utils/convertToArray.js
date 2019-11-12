
const convertTOArray = (checkPipeSeperatedVal) => {
    if(checkPipeSeperatedVal.includes('|')) {
        checkPipeSeperatedVal = checkPipeSeperatedVal.match(/[A-z0-9?\s]+/g)
    }
    return checkPipeSeperatedVal;
};

module.exports = convertTOArray;
