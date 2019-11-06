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
            console.log('error retrieving data')
        }
    },

    removeData: function () {
        let empty = {};
        AsyncStorage.setItem('key', JSON.stringify(empty));
        console.log("REMOVED")
    }
};

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

