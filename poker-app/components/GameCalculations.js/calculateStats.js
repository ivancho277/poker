const objToArray = (obj) => {
    // let values = Object.values(obj);
    let objArray = [];
    for (key in obj) {
        objArray.push({ [key]: obj[key] })
    }
    console.log('OBJECT ARRAY', objArray)
    return objArray
}

const isEmpty = function(obj){
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}





module.exports = {
    objToArray: objToArray,
    isEmpty: isEmpty

}