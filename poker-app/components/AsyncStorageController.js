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

    retrieveData: async function() {
        try{
        let keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        let games = await AsyncStorage.getItem('key');
        console.log(games);
        if(!isEmpty(games))    
            return games;
        }
        catch {
            console.log('error retrieving data')
        }
    },

    removeData: function(){
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

