import { AsyncStorage } from 'react-native';


/**
 *Checks if it is the Applications first time launching
 *Set storage key after first launch
 * @returns {boolean} 
 */
const firstTimeLauching = async function () {
    try {
        let isFirstLaunch = await AsyncStorage.getItem('firstlaunch')
        if (isFirstLaunch === undefined) {
            AsyncStorage.setItem('firstlaunch', 'false')
            return true;
        }
        return false;

    } catch (error) {
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
        console.log(`success storing ${data.calls}`);
        return data;
    }
    catch (error) {
        console.log("error saving data");
        return null;
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
    } catch (error) {
        console.log("error saving current game");
        return null;
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
        (console.log('nothing to remove'));
    }
}

/**
 *
 * -retrieves all Saved Games
 * @returns {Object} -all games
 */
const retrieveData = async function () {
    try {
        let keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        let games = await AsyncStorage.getItem('key');
        console.log(games);
        if (!isEmpty(games))
            return games;
    }
    catch (error) {
        console.log('error retrieving data');
        return null;
    }
}

/**
 *removes all saved games
 *
 */
const removeData = function () {
    try {
        let empty = {};
        AsyncStorage.setItem('key', JSON.stringify(empty));
        console.log("REMOVED")
    }
    catch (error) {
        return null;
    }

}

/**
 *
 *save tags to storage
 * @param {String[]} data
 */
const saveTags = function (data) {
    try {
        AsyncStorage.setItem('tags', JSON.stringify(data));
        console.log("SUCCESS STORING TAGS")
    } catch (error) {

        console.log("ERROR SAVING TAGS")
        return null;
    }
}

/**
 * get array of all tags
 *
 * @returns {String[]}
 */
const retrieveTags = async function () {
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
    } catch (err) {
        //throw Error(err);
        console.log('could not retrieve actions');
        return null;
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

const saveAllNewGames = function (allGames) {
    try {
        AsyncStorage.setItem('games', JSON.stringify(allGames));
        console.log(`success storing ${allGames.calls}`);
        return allGames;
    }
    catch (error) {
        console.log("error saving allGames");
        return null;
    }
}

const deleteAllNewGames = function () {
    try {
        AsyncStorage.removeItem('games', () => {
            alert('REMOVED DA GAMEZ');
        })
    } catch {
        alert('NO WORK DELETE');
    }
}

const getAllNewGames = async function () {
    try {
        const games = await AsyncStorage.getItem('games');
        return games;

    }
    catch {
        console.log('No Saved Games');
        return null;
    }
}

const getTotals = async function () {
    try {
        const totals = AsyncStorage.getItem('totals');
        return totals;
    } catch {
        console.log("no totals");
        return null;
    }
}

const getTotalsByPosition = async function () {
    try {
        const totalsByPosition = AsyncStorage.getItem('position_totals');
        return totalsByPosition;
    } catch {
        console.log("no position totals");
        return null;
    }
}


const setInitialTotals = function (actionsArr) {
    try {
        const totals = {};
        const totalsByPosition = {};
        actionsArr.forEach(action => {
            totals[action] = 0;
            totalsByPosition[action] = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
        });
        AsyncStorage.setItem('totals', JSON.stringify(totals));
        AsyncStorage.setItem('position_totals', JSON.stringify(totalsByPosition));
        console.log("SET TOTALS: ", totals)
        console.log("TOTSPOS: ", totalsByPosition);
    } catch {
        console.log('Not Able to setTotals')

    }
}

const setTotals = function (totals) {
    try {
        AsyncStorage.setItem('totals', totals);
    } catch {
        console.log('cant set Totals');
    }
}

const updateTotals = async function (liveGame) {
    try {
        const { actions } = liveGame;
        getTotals().then(res => {
            const savedTotals = JSON.parse(res);
            getTotalsByPosition().then(res => {
                const savedPositionTotals = JSON.parse(res);
                /**
                 * here we need to just add game data to both totals at the correct actions. 
                 * TODO: keep running total on actions that exsist and create a new one and assign it to be equal to the value in this game to start                
                 */
                console.log('LIVE YO YO: ', actions)



                console.log('update: POSTOTS: ', savedPositionTotals);
                console.log('update TOTS: ', savedTotals)


            })


        })
    } catch {

    }
}

const deleteTotals = function () {
    try {
        AsyncStorage.removeItem('totals', () => {
            console.log('Totals removed');
        });
        AsyncStorage.removeItem('position_totals', () => {
            console.log('Position Totals Removed');
        });
    } catch {
        console.log('totals not removed.');
    }
}

export const StorageAPI = {
    setTotals: setTotals,

    getTotalsByPosition: getTotalsByPosition,

    setInitialTotals: setInitialTotals,

    getTotals: getTotals,

    updateTotals: updateTotals,

    deleteTotals: deleteTotals,

    getAllNewGames: getAllNewGames,

    saveAllNewGames: saveAllNewGames,

    deleteAllNewGames: deleteAllNewGames,

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



