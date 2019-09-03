

module.exports = {
    findTag: function (allGames) {
        return null;
    },

    calculateTotalStats: function (games) {
        return countTotal(games);
    },

    calculateStatsByTag: function (games) {
        return null;
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

//   function findTag(obj, tag){
//      let tagsArr = [];
//     console.log(obj.games)
//      for(let i = 0; i < obj.games.length; i++){
//       if(obj.games[i].tags.includes(tag)){
//           tagsArr.push(obj.games[i]);
//       }
//      }
//     return tagsArr
//   }



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








