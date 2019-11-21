import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';




module.exports = {
    saveData: function (data) {
        try {
            AsyncStorage.setItem('key', JSON.stringify(data));
            console.log(`success storing ${data.calls}`);
            return data;
        }
        catch (error) {
            console.log("error saving data");
        }
    },

    saveCurrentGame: function (data) {
        try {
            AsyncStorage.setItem('currentGame', JSON.stringify(data));
            console.log(`stored a current Game!`)
            return data
        } catch {
            console.log("error saving current game")
        }
    },

    retrieveCurrentGame: async function () {
        try {
            let currentGame = await AsyncStorage.getItem('currentGame')
            return currentGame;
        } catch {
            console.log("NO CURRENT GAME!");
            return null;
        }
    },

    removeCurrentGame: async function () {
        try {
            AsyncStorage.removeItem('currentGame', () => {
                console.log("game removed")
                return null;
            })
        } catch {
            (console.log('nothing to remove'))
        }
    },

    retrieveData: async function () {
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
    },

    removeData: function () {
        let empty = {};
        AsyncStorage.setItem('key', JSON.stringify(empty));
        console.log("REMOVED")
    },

    saveTags: function (data) {
        try {
            AsyncStorage.setItem('tags', JSON.stringify(data));
            console.log("SUCCESS STORING TAGS")
        } catch {
            console.log("ERROR SAVING TAGS")
        }
    },

    retrieveTags: async function () {
        try {
            let allTags = await AsyncStorage.getItem('tags');
            return allTags;
        } catch {
            console.log("No Tags")
        }
    },

    removeTags: function () {
        try {
            AsyncStorage.removeItem('tags', () => {
                console.log('Tags Removed')
            })
        } catch {
            console.log("Unable to remove tags")
        }
    },

    saveActions: function (data) {
        try {
            AsyncStorage.setItem('actions', JSON.stringify(data));
            console.log('success storing actions');
        } catch {
            console.log('unable to store actions')
        }
    },

    retrieveActions: async function () {
        try {
            let actions = await AsyncStorage.getItem('actions');
            return actions;
        } catch {
            console.log('could not retrieve actions')
        }
    },

    resetActions: function () {
        try {
            const originalAction = ['call', 'fold', 'raise'];
            AsyncStorage.setItem('actions', JSON.stringify(originalAction))
            console.log('actions reset')
        } catch{
            console.log('Couldnt reset actions')
        }
    }

};

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

