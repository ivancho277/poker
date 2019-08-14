import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

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
        let games = await AsyncStorage.getItem(keys[0]);
        console.log(games);
        return games;
        }
        catch {
            console.log('error retrieving data')
        }
    }

    // removeData: async function(key){
    //     await AsyncStorage.removeItem(key);
    //     console.log("REMOVED")
    // }
};

