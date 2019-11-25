module.exports = {
    /**
     * 
     * @param {object} allGames 
     * @param {string} tag 
     */
    findTag: function (allGames, tag) {
        return SearchTag(allGames, tag)
    },

    /**
     * 
     * @param {object} games 
     * @param {string} tag 
     */
    calculateTotalStats: function (games) {
        return countTotal(games);
    },

    /**
     * 
     * @param {object} games 
     * @param {string} tag 
     */
    calculateStatsByTag: function (games, tag) {
        const gamesArray = SearchTag(games, tag);
        const gamesObj = {
            games: gamesArray
        }
        return countTotal(gamesObj)
    },

    /**
     * 
     * @param {object} gameObj 
     */
    calculateByPosition: function (gameObj) {
        return CountPositions(gameObj)

    },
    /**
     * 
     * @param {object} gameObj 
     */
    getPercentages: function (gameObj) {
        return calculatePercentages(gameObj);
    },

    /**
     * 
     * @param {object} gamesObj 
     * @param {Array} tagsArr 
     */
    includesAllTags: function (gamesObj, tagsArr) {
        return findManytags(gamesObj, tagsArr)
    },


    calcTotalsPerPosition: function (gameObj) {
        return totalsPerPosition(gameObj);
    },

    calcTotalsPerAction: function (gamesObj) {
        return totalsPerAction(gamesObj);
    },

    calcPercentByPosition: function (gamesObj) {
        return percentagesByPostion(gamesObj);
    },

    calcCurrentGamePercentages: function(gamesObj, currentGame){
        return percentagePerPositionByTags(gamesObj, currentGame)
    }
}


function CountPositions(obj) {
    //go through games and find totals per position

    try {
        let finalStats = {}
        //debugger;

        obj.games.forEach(game => {
            for (action in game.game) {
                //console.log(action + " " + game.game)
                if (!finalStats[action]) {
                    finalStats[action] = {}
                }
                for (position in game.game[action]) {
                    //console.log(position + " "  + "    " + action)
                    //nsole.log("POSISH " + position)
                    if (finalStats[action][position]) {
                        finalStats[action][position] = finalStats[action][position] += game.game[action][position];
                    }
                    else {
                        finalStats[action][position] = game.game[action][position]
                    }
                }
            }

        })


        console.log("STATS", finalStats)
        return finalStats;
    } catch {
        console.log("Cant calculate positions")
    }

}

function calculatePercentages(obj) {
    try {
        // debugger;
        let seperateTotals = countTotal(obj);
        let totalActions = Object.values(seperateTotals).reduce((a, i) => a + i);
        console.log(totalActions)
        const totalsArray = []
        for (action in seperateTotals) {
            totalsArray.push({ [action]: Math.round(seperateTotals[action] / totalActions * 100) })
        }
        console.log(totalsArray)
        return totalsArray;

    } catch{
        return console.log("nothing to calculate")
    }
}


function countTotal(obj) {
    try {
        //debugger;
        let totals = {}
        obj.games.forEach(game => {
            for (action in game.game) {
                //console.log(action + " " + game.game[action].total)
                if (!totals[action]) {
                    totals[action] = game.game[action].total
                }
                else {
                    totals[action] = totals[action] += game.game[action].total
                }
            }
        })
        console.log('STATS', totals)
        return totals
    } catch {
        throw console.error('cant count');
        
        alert('cant count')
    }

}

/**
 * 
 * @param {object} allgames 
 * @param {string} tag 
 */
function SearchTag(allgames, tag) {
    //console.log("FUNCTION",allgames, "TAGwE: ", tag)
    let foundGamesWithTag = allgames.games.filter((game => {
        if (game.tags.includes(tag)) {
            return game;
        }
    }));
    return foundGamesWithTag;
}

function checkversion(OldVersion) {
    let currentVersion = '1.0.3';

}

function findManytags(allgames, tagarr) {
    let foundgames = allgames.games.filter(game => {
        if (tagarr.every(value => { return (game.tags.indexOf(value) >= 0) })) {
            return game;
        }
    })
    return foundgames;
}

function totalsPerAction(allgames) {
    try {
        //debugger;
        let totals = {}
        //console.log("FUNCTION", allgames)
        allgames.games.forEach(game => {
            //console.log(game)
            for (action in game.game) {
               // console.log(action + " " + game.game[action].total)

                if (!totals[action]) {
                    //console.log("YOU", game.game[action])
                    totals[action] = {}
                }

                for (position in game.game[action]) {
                    //console.log("MEEEE", game.game[action][position])
                    if ([position] != 'total') {
                        if (!totals[action][position]) {
                            totals[action][position] = game.game[action][position]
                        }
                        else {
                            totals[action][position] = totals[action][position] + game.game[action][position]

                        }
                    }
                }


            }
        })
       // console.log('PERCENT', totals)
        return totals
    } catch {
        console.log('cant count')
        
       // alert('cant count')
    }
}

function totalsPerPosition(allgames) {
    let perAction = totalsPerAction(allgames);
    let positionTotals = {}
    for (action in perAction) {
        for (position in perAction[action]) {
            if (!positionTotals[position]) {
                positionTotals[position] = perAction[action][position]
            }
            else {
                positionTotals[position] = positionTotals[position] + perAction[action][position]
            }
        }
    }
    console.log('POS TOT: ', positionTotals)
    return positionTotals;
}

function percentagesByPostion(allgames) {
    let perAction = totalsPerAction(allgames);
    let perPosition = totalsPerPosition(allgames);
    // console.log('me: ', perPosition)
    let array = Object.values(perPosition);
    let percentages = {};
    for (action in perAction) {

        percentages[action] = perAction[action];
        //console.log("too: ", percentages[action], action)

        for (position in perAction[action]) {
            percentages[action][position] = Math.round(perAction[action][position] / perPosition[position] * 100)
        }
    }

   // console.log("look at me", percentages)
    return percentages;
}

function percentagePerPositionByTags(allgames, currentGame) {
    let foundGames = [];
    foundGames = findManytags(allgames, currentGame.tags);
    let percentages = {};
    percentages = currentGame.actions.map(action => {
        let name = action.actionName
        let total = action.count
        return {[name]: total}
    })
    console.log("NEW TEST: ", percentages)
    let totals = countTotal({games: foundGames});
    console.log("Test 2: ", totals);
  

}



let test = {
    version: "1.0.0",
    games: [{
        calls: 3,
        folds: 5,
        raises: 1,
        tags: ['home', 'vegas', 'holdem']
    },
    {
        calls: 4,
        folds: 1,
        raises: 2,
        tags: ['vegas', 'virtual']
    }
    ]

}
//   console.log(countTotal(test));
//   console.log(findTag(test, 'home'));