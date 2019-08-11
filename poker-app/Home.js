import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
const storage = require("./components/AsyncStorageController.js");
class HomeScreen extends Component {
    state = {
        gamesArray : []
    }

    componentDidMount() {
        this.setState({
            gamesArray: storage.retrieveData
        })
    }

    // retrieveData = async () => {
    //     let keys = await AsyncStorage.getAllKeys()
    //     console.log(keys);
    //     let games = await AsyncStorage.getItem(keys[0])
    //     console.log(JSON.parse(games));
    //     return JSON.parse(games);
    // }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <StatsBox games={storage.retrieveData} />
                <Button title="Game" style={{margin: '10px'}} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={storage.retrieveData}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
            </View>
        )
    }  
}

export default HomeScreen; 