const objToArray = (obj) => {
    // let values = Object.values(obj);
    let objArray = [];
    for (key in obj) {
        objArray.push({ [key]: obj[key] })
    }
    console.log('OBJECT ARRAY', objArray)
    return objArray
}

const isEmpty = function (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * !!We may not really need this at the moment, as we are keeping a running total. Although may be good to write and keep as 
 * !!a function to check our totals, or if data gets lost, we can re-calculate.
 */
const countTotals = (allGames) => {

    
}

const sumAllGameActions = (games) => {
    let sum = 0;
    console.log("HERE", typeof(games))
    if (typeof(games) === 'object' ) {
        for (action in games) {
            sum += games[action]
        }
        console.log('This Object', sum);
        return sum;
    }
    //!!check this later
    if (typeof(games) === 'Array'){
        sum = games.reduce((total, action) => { console.log(Object.keys(action)); total + action[Object.keys(action)[0]]} );
        console.log('This Array: ', sum);
        return sum;
    }
    return null;

}





module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    countTotals: countTotals,
    sumAllGameActions: sumAllGameActions,

}