

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


const PositionsObjToArray = (positionObj) =>  {
   // console.log("in me:", positionObj);
    let outterArray =  [];
    for(action in positionObj){
        //let count = 0;
       // console.log(`#${count++} : ${action}`)
        let actionName = action
        actionName = [];
       // console.log(actionName)
        for(position in positionObj[action]) {
            //console.log("what it looks like:",positionObj[action][position])
            actionName.push({[position] : positionObj[action][position]});
        }
        outterArray.push({[action] : actionName} ) 
    }
    return outterArray;
}


module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    PositionsObjToArray: PositionsObjToArray

}

