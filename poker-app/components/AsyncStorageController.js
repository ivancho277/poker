import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';



const firstTimeLauching = async function () {
    try {
        let isFirstLaunch = await AsyncStorage.getItem('firstlaunch')
        if(isFirstLaunch === null){
            AsyncStorage.setItem('firstlaunch', 'false')
            return true;
        } 
        return false;
        
    } catch (error){
        return false;
    }
}



const saveData = function (data) {
    try {
        AsyncStorage.setItem('key', JSON.stringify(data));
        console.log(`success storing ${data.calls}`);
        return data;
    }
    catch (error) {
        console.log("error saving data");
    }
}

const saveCurrentGame = function (data) {
    try {
        AsyncStorage.setItem('currentGame', JSON.stringify(data));
        console.log(`stored a current Game!`)
        return data
    } catch {
        console.log("error saving current game")
    }
}

const retrieveCurrentGame = async function () {
    try {
        let currentGame = await AsyncStorage.getItem('currentGame')
        return currentGame;
    } catch {
        console.log("NO CURRENT GAME!");
        return null;
    }
}

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

const retrieveData = async function () {
    try {
        let keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        let games = await AsyncStorage.getItem('key');
        console.log(games);
        if (!isEmpty(games))
            return games;
    }
    catch {
        throw error
        console.log('error retrieving data')
    }
}
    
const removeData = function () {
    let empty = {};
    AsyncStorage.setItem('key', JSON.stringify(empty));
    console.log("REMOVED")
}

const saveTags = function (data) {
    try {
        AsyncStorage.setItem('tags', JSON.stringify(data));
        console.log("SUCCESS STORING TAGS")
    } catch {
        console.log("ERROR SAVING TAGS")
    }
}

const retrieveTags =  async function () {
    try {
        let allTags = await AsyncStorage.getItem('tags');
        return allTags;
    } catch {
        return null;
        console.log("No Tags")
    }
}

const removeTags = function () {
    try {
        AsyncStorage.removeItem('tags', () => {
            console.log('Tags Removed')
        })
    } catch {
        console.log("Unable to remove tags")
    }
}

const saveActions = function (data) {
    try {
        AsyncStorage.setItem('actions', JSON.stringify(data));
        console.log('success storing actions');
    } catch {
        console.log('unable to store actions')
    }
}

const retrieveActions = async function () {
    try {
        let actions = await AsyncStorage.getItem('actions');
        return actions;
    } catch {
        console.log('could not retrieve actions')
    }
}

const resetActions = function () {
    try {
        const originalAction = ['call', 'fold', 'raise'];
        AsyncStorage.setItem('actions', JSON.stringify(originalAction))
        console.log('actions reset')
    } catch{
        console.log('Couldnt reset actions')
    }
}


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

    isFirstLaunch: isFirstLaunch

}

