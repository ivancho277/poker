import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
const storage = require("./components/AsyncStorageController.js");
class HomeScreen extends Component {
    state = {
        loading: true,
        gamesObj: {
            
        }
    }

    componentDidMount() {
        storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));
            this.setState({
                gamesObj: JSON.parse(res),
                loading: false
            })
            

        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            throw error;
        })
    }






    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <StatsBox games={this.state.gamesObj} loading={this.state.loading} />
                <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={this.componentDidMount}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => storage.removeData()}>
                    <Text>Delete storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen; 