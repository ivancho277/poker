import { AsyncStorage } from 'react-native';
import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';

const secureStore = createSecureStore();
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

const setData = function (data) {
    try {
        return secureStore.setItem('gamedata', JSON.stringify(data)).then(() => {
            console.log(`${data} stored successfully`)
            return data;
        });
    }
    catch (error) {
        console.log("error saving data");
        return null;
    }
}

const getData = async function () {
    try {
        return await secureStore.getItem('gamedata').then(res => {
            console.log('retrieved', res);
            return res;
        })
    } catch {
        console.log("UNABLE TO GET DATA");
        return null;
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
        const originalActions = ['call', 'fold', 'raise'];
        AsyncStorage.setItem('actions', JSON.stringify(originalActions))
        console.log('actions reset')
        return originalActions;
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
            //alert('REMOVED DA GAMEZ');
            return 'removed'
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
        const totalsByPosition = await AsyncStorage.getItem('position_totals');
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
        //return {totals: totals, positionTotals: totalsByPosition}
    } catch {
        console.log('Not Able to setTotals')

    }
}

const setTotals = function (totals) {
    try {
        AsyncStorage.setItem('totals', JSON.stringify(totals));
    } catch {
        console.log('cant set Totals');
    }
}

const setPositionTotals = function (positionTotals) {
    try {
        AsyncStorage.setItem('position_totals', JSON.stringify(positionTotals))
    } catch {
        console.log('could not do it');
    }
}



const updateTotals = async function (liveGame) {
    try {
        const { actions } = liveGame;
        getTotals().then(res => {
            const savedTotals = JSON.parse(res);
            getTotalsByPosition().then(res => {
                const savedPositionTotals = JSON.parse(res);
                //  console.log('LIVE YO YO: ', actions);
                // console.log('update: POSTOTS: ', savedPositionTotals);
                //  console.log('update TOTS: ', savedTotals);
                // debugger;
                actions.forEach(action => {
                    //console.log(action.actionName)
                    if (savedTotals.hasOwnProperty(action.actionName)) {
                        savedTotals[action.actionName] += action.count
                    } else {
                        savedTotals[action.actionName] = action.count;
                        //console.log("else : ", savedTotals[action.actionName]);
                    }
                    if (savedPositionTotals.hasOwnProperty(action.actionName)) {
                        for (position in savedPositionTotals[action.actionName]) {

                            savedPositionTotals[action.actionName][position] += action.countPerPosition[position]
                        }
                    } else {
                        savedPositionTotals[action.actionName] = action.countPerPosition;
                        // console.log("else else: ", savedPositionTotals[action.actionName]);
                    }
                })
                //console.log("Lets hope it works: ", savedPositionTotals);
                //console.log("AFTER TOTS", savedTotals);
                setTotals(savedTotals);
                setPositionTotals(savedPositionTotals);
            })
        })
    } catch {
        console.log("ERROR UPDATING TOTALS!!!!!!!!!!")
    }
}
/**
 * *Removes running total and running total per position form storage
 *
 */
const deleteTotals = function () {
    try {
        AsyncStorage.removeItem('totals', () => {
            console.log('Totals removed');
        });
        AsyncStorage.removeItem('position_totals', () => {
            console.log('Position Totals Removed');
        });
        AsyncStorage.removeItem('Pcount', () => {
            console.log('Position Counters removed');
        })
    } catch {
        console.log('totals not removed.');
    }
}

const setInitialPositionCount = () => {
    try {
        const initPCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
        AsyncStorage.setItem('Pcount', JSON.stringify(initPCount));
        console.log("Position Count Set")
    }
    catch {
        console.log('could not set Position Count');
    }
}
const setPositionCount = (Pcount) => {
    try {
        AsyncStorage.setItem('Pcount', JSON.stringify(Pcount));
        console.log('Success Setting Position Count')
    } catch {
        console.log('Counld NOT SET PCOUNT!')
    }
}

const deletePositionCount = () => {
    try {
        AsyncStorage.removeItem('Pcount', () => {
            console.log('Removed Position Count');
        })
    } catch {
        console.log('Could not remove Position Count')
    }
}

const getPositionCount = async () => {
    try {
        let PositionCount = await AsyncStorage.getItem('Pcount')
        return PositionCount;
    } catch {
        console.error('Could not get Position count');
        return null;
    }



}
export const StorageAPI = {
    getPositionCount: getPositionCount,

    deletePositionCount: deletePositionCount,

    setPositionCount: setPositionCount,

    setInitialPositionCount: setInitialPositionCount,

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

    isEmpty: isEmpty,

    setData: setData,
    getData: getData,


}



