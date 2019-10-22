import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import PBC from './components/PracticeButtonController';
import StatsBox from './components/Statsbox'
const storage = require("./components/AsyncStorageController.js");
//import Controller from './components/Controller'
class GameScreen extends Component {



    goHome() {
        this.props.navigation.navigate('Home');
    }
    logTags = async () => {   
        let tags = await storage.retrieveData().then((res) => {
            console.log("HEY CHECK ME OUT");
            console.log(JSON.parse(res), this.state.tagsearch)
            const data = JSON.parse(res)
            let byTag = calculations.findTag(data, this.state.tagsearch);
            console.log(byTag);
            return byTag;
        }).catch(err => {
            console.log("nothing here");
            throw err;
        })
        return tags;
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <StatsBox logTags={this.logTags} height={200} width={170} />
                <Text>Controller will go here</Text>
                <PBC goHome={this.goHome} />
                <Button title='Go to home screen' onPress={() => this.goHome()} />
            </View>
        )
    }
}

export default GameScreen;