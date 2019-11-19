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
                if(!finalStats[action]){
                    finalStats[action] = {}
                }
                for (position in game.game[action]){
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
        let totalCalls = 0;
        let totalFolds = 0;
        let totalRaises = 0;
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
        alert('cant count')
    }

}

/**
 * 
 * @param {object} allgames 
 * @param {string} tag 
 */
function SearchTag(allgames, tag) {
    let foundGamesWithTag = allgames.games.filter((game => {
        if(game.tags.includes(tag)){
            return game;
        }
    }));
    return foundGamesWithTag;
}

function checkversion(currentVer, OldVersion) {

}

function countTotalfromTag(obj, tag = "all") {
    if (tag === "all") {
        let totalCalls = 0;
        let totalFolds = 0;
        let totalRaises = 0;
        for (let i = 0; i < obj.games.length; i++) {
            totalCalls += obj.games[i].calls;
            totalFolds += obj.games[i].folds;
            totalRaises += obj.games[i].raises;
        }
        return {
            calls: totalCalls,
            folds: totalFolds,
            raises: totalRaises
        }
    } else {
        let tagsArr = [];

        for (let i = 0; i < obj.games.length; i++) {
            console.log(tag);
            console.log(obj.games[i].tags.includes(tag));
            if (obj.games[i].tags.includes(tag)) {
                let temp = {
                    calls: obj.games[i].calls,
                    folds: obj.games[i].folds,
                    raises: obj.games[i].raises,
                    tags: [...obj.games[i].tags]
                }
                tagsArr.push(temp);
            }
        }
        return tagsArr

    }
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