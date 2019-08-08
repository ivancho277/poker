import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
class HomeScreen extends Component {
    state = {
        gamesArray : []
    }

    componentDidMount() {
        this.setState({
            gamesArray: this.retrieveData()
        })
    }

    retrieveData = async () => {
        let keys = await AsyncStorage.getAllKeys()
        console.log(keys);
        let games = await AsyncStorage.getItem(keys[0])
        console.log(JSON.parse(games));
        return JSON.parse(games);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <StatsBox games={this.retrieveData} />
                <Button title="Game" style={{margin: '10px'}} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={this.retrieveData}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
            </View>
        )
    }  
}

export default HomeScreen; 