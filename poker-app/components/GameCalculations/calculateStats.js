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
 * TODO: 7/1/2020 Fix the conditionals here, needs to account for games comming in as undefined or null as well
 * NOTE: 7.1.2020 Really think about best way to deal with null or undefined cases
 * 
 */
const searchByManyTags = (tagsArray, games) => {
    if (games) {
        if (tagsArray instanceof Array) {
            if (tagsArray.length === 0 || games.length === 0) {
                return [];
            }
            const foundGames = games.filter(savedGame => {
                if (tagsArray.every(tag => { return (savedGame.game.data.tags.indexOf(tag) >= 0) })) {
                    return savedGame;
                }
            });
            //console.log("MANY TAGS:", foundGames);
            return foundGames.length > 0 ? foundGames : [];
        }
    }
    return [];
}

const anyGamesFound = (gamesList) => {
    if(gamesList === null || gamesList === undefined){
        return false;
    }
    else if(gamesList.length == 0){
        return false;
    }
    else {
        return true;
    }
}


/**
 * NOTE: Sums up recieved array of games found;
 */
const sumGamesTotals = (games) => {
    if (games === null || games === undefined) {
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
        console.log('This Array: ', games);
        let init = 0;
        sum = games.reduce((total = 0, action) => {
            let value = parseInt(action[Object.keys(action)[0]]); return total + value
        }
            , init);
        console.log('This Array: ', sum);
        return sum;
    }
    if (typeof (games) === 'object') {
        for (action in games) {
            sum += games[action]
        }
        console.log('This Object', sum);
        return sum;
    }
    return null;
}
const calculatePercentage = (count, total) => {

    return Math.round(count / total * 100)
}

const percentagesPerPositionForEachAction = (posTotals, posCounts, currentPosition) => {
    //console.log('PosTotals::::', posTotals);
    //console.log('PosCounts::::', posCounts);
    let percentageArray = [];

    for (position in posCounts) {
        let obj = {};
        console.log('position:::', position)
        let actionName;
        for (action in posTotals) {
            actionName = action
            !([action] in obj) && (obj[action] = {});
            obj[action][position] = ( isNaN(calculatePercentage(posTotals[action][position], posCounts[position])) ) ? 0 : calculatePercentage(posTotals[action][position], posCounts[position])
            // console.log('OBJ:.;.;.;.;.;.;.', obj);
            // console.log(`Action::::: ${ calculatePercentage(posTotals[action][position], posCounts[position] )} %` )
            // console.log("posTotals{action}:::::", action)
            // console.log("Count[posi]:::::", posCounts[position])
        }
        percentageArray.push(obj);
    }
    //console.log(percentageArray);
    return percentageArray;
}

//TODO: 6/21/202 Sunday, finish this funct. and implement in Game Display.
const sumPositionCount = (games) => {
    let actionCountPerPosition = sumGamesPositions(games);
    console.log('actionCountPerPosition: %o', actionCountPerPosition);
    let positionCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    for (action in actionCountPerPosition) {
        for (position in actionCountPerPosition[action]) {
            // console.log('[ation]:%o', action);
            // console.log('action: %o', action);
            // console.log('position: %o', position);
            // console.log('[action][position]: %o', actionCountPerPosition[action][position]);
            positionCount[position] = positionCount[position] + actionCountPerPosition[action][position];
        }

    }
    // console.log('positionCount: %o', positionCount);
    return positionCount;

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
    sumPositionCount: sumPositionCount,
    anyGamesFound: anyGamesFound,
    
}