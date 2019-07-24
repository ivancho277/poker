import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Game extends Component {
    static navigationOptions = {
        title: "Welcome"
    };
    render() {
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text>Game Screen</Text>
            </View>
        )
    }
}

export default Game;