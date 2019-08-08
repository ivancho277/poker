import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import PBC from './components/PracticeButtonController'
//import Controller from './components/Controller'
class GameScreen extends Component {
    getDataFromController = (data) => {
        //console.log(data)
        try {
            AsyncStorage.setItem('key', JSON.stringify(data))
            console.log(`success storing ${data.calls}`);
            return jsonData;
        } catch (error) {
            console.log("error saving data");
        }
    }
    goHome() {
        this.props.navigation.navigate('Home');
        
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Controller will go here</Text>
                <PBC getDataFromController={this.getDataFromController} goHome={this.goHome} />
                <Button title='Go to home screen' onPress={() => this.goHome()} />
            </View>
        )
    }
}

export default GameScreen;