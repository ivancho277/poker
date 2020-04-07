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

const countTotals = (allGames) => {
    try {
        console.log(allGames)
        const finalTotals = {}
        allGames.forEach(element => {
            console.log("element start: ", element.game.totals)
            element.game.totals.forEach
            


        });
    } catch {

    }
}





module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    countTotals: countTotals

}