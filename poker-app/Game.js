import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PBT from './components/PracticeButtonController'
//import Controller from './components/Controller'
class GameScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Controller will go here</Text>
                <PBT />
                <Button title='Go to home screen'onPress={() => this.props.navigation.navigate('Home')} />
            </View>
        )
    }
}

export default GameScreen;