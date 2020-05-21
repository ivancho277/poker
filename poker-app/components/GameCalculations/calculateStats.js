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
    console.log(foundGames);
    return foundGames.length > 0 ? foundGames : null;
}


/**
 * !!needs to be tested after i have a multiselct option working on the stats screen.
 * TODO: test this function 
 */
const searchByManyTags = (tagsArray, games) => {
    const foundGames = games.filter(savedGame => {
        if (tagsArray.every(tag => { return (savedGame.game.data.tags.indexOf(tag) >= 0) })) {
            return savedGame;
        }
    });
    console.log("MANY TAGS:", foundGames);
    return foundGames.length > 0 ? foundGames : null;
}

const sumGamesTotals = (games) => {
    if (games === null) {
        return 'no games'
    }
    console.log('sumFUNT:', games)
    if (games instanceof Array) {
        if (games.length > 0) {
            let accum = 0;
            let total = 0;
            let sum = games.reduce((accum = 0, _game) => {
               // debugger;
               console.log("count:", accum)
                let innerSum = _game.game.data.actions.reduce((total = 0, action) => {
                    return total + action.count;
                }, total);
                console.log('inner SUM: ', innerSum);
                return accum + innerSum;
            }, accum);
            return sum;
        } else {
            return 'no array games'
        }
    }
}

const sumGamesPositions = (games) => {

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



module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    countTotals: countTotals,
    sumAllGameActions: sumAllGameActions,
    searchBytag: searchBytag,
    searchByManyTags: searchByManyTags,
    sumGamesTotals: sumGamesTotals,
}