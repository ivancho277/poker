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
        allGames.forEach(element => {
            if(element !== undefined){
            console.log("element start: ", element.game.totals)
            }


        });
    } catch {

    }
}





module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty,
    countTotals: countTotals

}