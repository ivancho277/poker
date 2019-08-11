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
        let keys = await AsyncStorage.getAllKeys();
        console.log(keys);
        let games = await AsyncStorage.getItem(keys[0]);
        console.log(JSON.parse(games));
        return JSON.parse(games);
    }
};

