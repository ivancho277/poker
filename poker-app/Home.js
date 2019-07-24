import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import StatsBox from './components/Statsbox'
class HomeScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <StatsBox />
                <Button title="Game" onPress={() => this.props.navigation.navigate('Game')} />
                 
            </View>
        )
    }
}

export default HomeScreen; 