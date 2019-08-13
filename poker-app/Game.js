import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import PBC from './components/PracticeButtonController'
const storage = require("./components/AsyncStorageController.js");
//import Controller from './components/Controller'
class GameScreen extends Component {
  

   
    goHome() {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Controller will go here</Text>
                <PBC goHome={this.goHome} />
                <Button title='Go to home screen' onPress={() => this.goHome()} />           
            </View>
        )
    }
}

export default GameScreen;