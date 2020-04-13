

/**
 *
 * Turns an object into an array of objects. For key: value pairs only one level deep. Example {'call' : 2, 'fold': 3} turns to [{'call': 2}, {'fold': 3}]
 * @param {Object} obj
 * @returns {Array} an array of objects
 */
const objToArray = (obj) => {
    // let values = Object.values(obj);
    let objArray = [];
    for (key in obj) {
        objArray.push({ [key]: obj[key] })
    }
    console.log('OBJECT ARRAY', objArray)
    return objArray
}


/**
 *
 * checks weather or not an object is empty of any elements
 * @param {Object} obj
 * @returns {boolean} 
 */
const isEmpty = function(obj){
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


const PositionsObjToArray = (PositionsObj) =>  {
    let outterArray =  [];
    for(action in PositionsObj){
        let actionName = [action];
        actionName = [];
        for(position in [action]) {
            actionName.push({[position] : action[position]});
        }
        outterArray.push([action])
    }
}


module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    PositionsObjToArray: PositionsObjToArray

}

