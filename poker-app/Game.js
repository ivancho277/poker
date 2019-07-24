import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Controller from './components/Controller'
class GameScreen extends Component {
    
    render() {     
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text>Controller will go here</Text>
            </View>
        )
    }
}

export default GameScreen;