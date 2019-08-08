import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import PBC from './components/PracticeButtonController'
//import Controller from './components/Controller'
class GameScreen extends Component {
    getDataFromController = (data) => {
        //console.log(data)
        try {
            AsyncStorage.setItem('key', JSON.stringify(data))
            console.log(`success storing ${data.calls}`);
            return data;
        } catch (error) {
            console.log("error saving data");
        }
    }

    retrieveData = async () => {
        let keys = await AsyncStorage.getAllKeys()
        console.log(keys);
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
                <TouchableOpacity onPress={this.retrieveData}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default GameScreen;