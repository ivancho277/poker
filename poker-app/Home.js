import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
const storage = require("./components/AsyncStorageController.js");
class HomeScreen extends Component {
    state = {
        gamesArray : [{calls:0, folds:0, raises: 0}]
    }

    

    componentDidMount() {
         storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));                            
            this.setState({
                gamesArray: JSON.parse(res)
            })
        })
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <StatsBox games={this.state.gamesArray} />
                <Button title="Game" style={{margin: '10px'}} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={storage.retrieveData}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
            </View>
        )
    }  
}

export default HomeScreen; 