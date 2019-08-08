import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
class HomeScreen extends Component {
    retrieveData = async () => {
        let keys = await AsyncStorage.getAllKeys()
        console.log(keys);
        return keys;
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <StatsBox />
                <Button title="Game" style={{margin: '10px'}} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={this.retrieveData}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen; 