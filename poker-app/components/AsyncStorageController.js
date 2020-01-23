import { AsyncStorage } from 'react-native';


/**
 *Checks if it is the Applications first time launching
 *Set storage key after first launch
 * @returns {boolean} 
 */
const firstTimeLauching = async function () {
    try {
        let isFirstLaunch = await AsyncStorage.getItem('firstlaunch')
        if(isFirstLaunch === undefined){
            AsyncStorage.setItem('firstlaunch', 'false')
            return true;
        } 
        return false;
        
    } catch (error){
        return false;
    }
}


/**
 *
 *
 * @param {Object} data -Full games object for with all game data
 * @returns {Object}
 */
const saveData = function (data) {
    try {
        AsyncStorage.setItem('key', JSON.stringify(data));
        // console.log(`success storing ${data}`);
        //return data;
    }
    catch (error) {
        console.log("error saving data");
        //throw Error(error);
    }
}
/**
 *
 *
 * @param {Object} data -saves a current game object to storage
 * @returns {Object}
 */
const saveCurrentGame = function (data) {
    try {
        AsyncStorage.setItem('currentGame', JSON.stringify(data));
        console.log(`stored a current Game!`)
        return data
    } catch (error){
        console.log("error saving current game");
        throw Error(error);
    }
}


/**
 *
 * gets a current game if one exsists
 * @returns {Object|null}
 */
const retrieveCurrentGame = async function () {
    try {
        let currentGame = await AsyncStorage.getItem('currentGame')
        return currentGame;
    } catch {
        console.log("NO CURRENT GAME!");
        return null;
    }
}

/**
 *removes current game form storage
 *
 */
const removeCurrentGame = async function () {
    try {
        AsyncStorage.removeItem('currentGame', () => {
            console.log("game removed")
            return null;
        })
    } catch {
        (console.log('nothing to remove'))
    }
}

/**
 *
 * -retrieves all Saved Games
 * @returns {Object} -all games
 */
const retrieveData = async function () {
    try {
        // let keys = await AsyncStorage.getAllKeys();
        // console.log(keys);
        let games = await AsyncStorage.getItem('key');
        console.log(games);
        if (!isEmpty(games)){
            return games;
        } else return games
    }
    catch(error) {
        console.log('error retrieving data')
        return null;
    }
}
    
/**
 *removes all saved games
 *
 */
const removeData = function () {
    try{
    let empty = {};
    AsyncStorage.setItem('key', JSON.stringify(empty));
    console.log("REMOVED")
    }
    catch(error){
        throw Error(Error)
    }
}

/**
 *
 *save tags to storage
 * @param {String[]} 
 */
const saveTags = function (data) {
    try {
        AsyncStorage.setItem('tags', JSON.stringify(data));
        console.log("SUCCESS STORING TAGS")
    } catch {
        //throw Error(error)
        console.log("ERROR SAVING TAGS")
    }
}

/**
 * get array of all tags
 *
 * @returns {String[]}
 */
const retrieveTags =  async function () {
    try {
        let allTags = await AsyncStorage.getItem('tags');
        return allTags;
    } catch {
        return null;
        console.log("No Tags")
    }
}

/**
 *remove all tags from storage
 *
 */
const removeTags = function () {
    try {
        AsyncStorage.removeItem('tags', () => {
            console.log('Tags Removed')
        })
    } catch {
        console.log("Unable to remove tags")
    }
}
/**
 *save game actions
 *
 * @param {String[]} data
 */
const saveActions = function (data) {
    try {
        AsyncStorage.setItem('actions', JSON.stringify(data));
        console.log('success storing actions');
    } catch {
        console.log('unable to store actions')
    }
}

/**
 *
 * gets all actions
 * @returns {String[]}
 */
const retrieveActions = async function () {
    try {
        let actions = await AsyncStorage.getItem('actions');
        return actions;
    } catch(err) {
        throw Error(err);
        console.log('could not retrieve actions')
    }
}

/**
 *resets game actions to the base 3.
 *
 */
const resetActions = function () {
    try {
        const originalAction = ['call', 'fold', 'raise'];
        AsyncStorage.setItem('actions', JSON.stringify(originalAction))
        console.log('actions reset')
    } catch{
        console.log('Couldnt reset actions')
    }
}


/**
 * checks if object is empty
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


module.exports = {
    saveData: saveData,
    /**
     * Takes a Current Game Object to save.
     * @param {Object} data 
     */
    saveCurrentGame: saveCurrentGame,

    retrieveCurrentGame: retrieveCurrentGame,

    removeCurrentGame: removeCurrentGame,

    retrieveData: retrieveData,
    
    removeData: removeData,

    saveTags: saveTags,

    retrieveTags: retrieveTags,

    removeTags: removeTags,

    saveActions: saveActions,

    retrieveActions: retrieveActions,

    resetActions: resetActions,

    firstTimeLauching: firstTimeLauching,
    
    isEmpty: isEmpty

}

