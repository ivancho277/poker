const objToArray = (obj) => {
    // let values = Object.values(obj);
    let objArray = [];
    for (key in obj) {
        objArray.push({ [key]: obj[key] })
    }
    //  console.log('OBJECT ARRAY', objArray)
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
 * NOTE: counts Total number of all actions together;
 */
const countTotals = (allGames) => {


}


const searchBytag = (tag, games) => {
    //console.log('Tag:::', tag);
    //console.log('allGames',games);

    const foundGames = games.filter(savedGame => {
        if (savedGame.game.data.tags.includes(tag)) {
            return savedGame;
        }
    });
    //console.log(foundGames);
    return foundGames.length > 0 ? foundGames : null;
}


/**
 * !!needs to be tested after i have a multiselct option working on the stats screen.
 * TODO: test this function 
 */
const searchByManyTags = (tagsArray, games) => {
    if (tagsArray instanceof Array) {
        if (tagsArray.length === 0) {
            return [];
        }
        const foundGames = games.filter(savedGame => {
            if (tagsArray.every(tag => { return (savedGame.game.data.tags.indexOf(tag) >= 0) })) {
                return savedGame;
            }
        });
        //console.log("MANY TAGS:", foundGames);
        return foundGames.length > 0 ? foundGames : null;
    }
}





/**
 * NOTE: Sums up recieved array of games found;
 */
const sumGamesTotals = (games) => {
    if (games === null) {

        return 'no games'
    }
    //console.log('sumFUNT:', games)
    if (games instanceof Array) {
        if (games.length > 0) {
            let accum = 0;
            let total = 0;
            let sum = games.reduce((accum = 0, _game) => {
                // debugger;
                //   console.log("count:", accum)
                let innerSum = _game.game.data.actions.reduce((total = 0, action) => {
                    return total + action.count;
                }, total);
                //console.log('inner SUM: ', innerSum);
                return accum + innerSum;
            }, accum);
            
            return sum;
        } else {
            return null;
        }
    }
}
/**
 * TODO: write function to sum up found games per pos.
 */
const sumGamesPositions = (games) => {
    if (games === null || games === undefined) {
        return null;
    }
    const totalsPerPosition = {};
    games.forEach(_game => {
        _game.game.data.actions.forEach(action => {
            let name = action.actionName;
            let positionObj = {}
            Object.assign(positionObj, action.countPerPosition)
            //   console.log("YE:", positionObj);
            //    console.log("YE:", name);
            //    console.log('What is your value? ', totalsPerPosition[name])
            if (totalsPerPosition[name]) {
                for (key in totalsPerPosition[name]) {
                    //  console.log('Why: ', totalsPerPosition[name][key])
                    totalsPerPosition[name][key] = totalsPerPosition[name][key] + positionObj[key];
                }
            } else {
                totalsPerPosition[name] = positionObj
            }
        })
    })
    return totalsPerPosition;
}

/**
 * TODO: handle null case error.
 */
const sumUpGameTotals = (games) => {
    if (games === null || games === undefined) {
        return null;
    }
    const sumTotals = {};
    games.forEach(_game => {
        _game.game.totals.forEach(action => {
            let actionKey = Object.keys(action)[0];
            let actionVal = action[actionKey];
            if (sumTotals[actionKey]) {
                //console.log(actionKey + "  " + actionVal);
                sumTotals[actionKey] += actionVal;
            }
            else {
                sumTotals[actionKey] = actionVal;
            }
        })
    })
    return sumTotals;
}




/**
 * NOTE: this sums the caclulated data actions
 */
const sumAllGameActions = (games) => {
    if (games === null) {
        return 'no games'
    }
    let sum = 0;
    if (games instanceof Array) {
        //console.log('This Array: ', sum);
        let init = 0;
        sum = games.reduce((total = 0, action) => {
            let value = parseInt(action[Object.keys(action)[0]]); return total + value
        }
            , init);
        //   console.log('This Array: ', sum);
        return sum;
    }
    if (typeof (games) === 'object') {
        for (action in games) {
            sum += games[action]
        }
        // console.log('This Object', sum);
        return sum;
    }
    return null;
}
const calculatePercentage = (count, total) => {

    return Math.round(count / total * 100)
}

const percentagesPerPositionForEachAction = (posTotals, posCounts, currentPosition) => {
    console.log('PosTotals::::', posTotals);
    console.log('PosCounts::::', posCounts);
    let percentageArray = [];

    for (position in posCounts) {
        let obj = {};
        console.log('position:::', position)
        let actionName;
        for (action in posTotals) {
            actionName = action
            !([action] in obj) && (obj[action] = {});
            obj[action][position] = calculatePercentage(posTotals[action][position], posCounts[position]);
            console.log('OBJ:.;.;.;.;.;.;.', obj);
            // console.log(`Action::::: ${ calculatePercentage(posTotals[action][position], posCounts[position] )} %` )
            console.log("posTotals{action}:::::", action)
            // console.log("Count[posi]:::::", posCounts[position])
        }
        percentageArray.push( obj );
    }
    console.log(percentageArray);
    return percentageArray;
}

module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    countTotals: countTotals,
    sumAllGameActions: sumAllGameActions,
    searchBytag: searchBytag,
    searchByManyTags: searchByManyTags,
    sumGamesTotals: sumGamesTotals,
    sumUpGameTotals: sumUpGameTotals,
    sumGamesPositions: sumGamesPositions,
    percentagesPerPositionForEachAction: percentagesPerPositionForEachAction,


}