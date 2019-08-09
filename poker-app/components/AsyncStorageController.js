import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

export default class AsyncStorageController extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  saveData(data){
    try{
        AsyncStorage.setItem('key', JSON.stringify(data));
        console.log(`success storing ${data.calls}`);
        return data;
    }
    catch(error){
        console.log("error saving data");
    }
  }

  retrieveData = async() => {
    let keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    let games = await AsyncStorage.getItem(keys[0]);
    console.log(JSON.parse(games));
    return JSON.parse(games);
  }

  render() {
    return (
      <View>
        <Text> AsyncStorageController </Text>
      </View>
    );
  }
}
