import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import PBT from './components/PracticeButtonController'
//import Controller from './components/Controller'
class GameScreen extends Component {
    getDataFromController = async (data) => {
        try {
            await AsyncStorage.setItem('game:key', data)
        } catch (error) {
            console.log("error saving data");
        }
    }
    goHome(){
         this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Controller will go here</Text>
                <PBT props={this.getDataFromController} />
                <Button title='Go to home screen' onPress={() => this.props.navigation.navigate('Home')} />

            </View>
        )
    }
}

export default GameScreen;