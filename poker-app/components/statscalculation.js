

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
    calculateStatsByTag: function (games,tag) {
        const gamesArray = SearchTag(games, tag);
        const gamesObj = {
            games: gamesArray
        }
        return countTotal(gamesObj)
    }


}

function countTotal(obj) {
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

}

/**
 * 
 * @param {object} obj 
 * @param {string} tag 
 */
function SearchTag(obj, tag) {
    let tagsArr = [];
    console.log(tag + " LOOOK AT TAG")
    console.log(obj)
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
    games: [
        {
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








