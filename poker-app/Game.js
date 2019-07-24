import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Game extends Component {
    static navigationOptions = {
        title: "Welcome"
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Home Screen"
                onPress={() => navigate('Home')}
            />
        )
    }
}

export default Game;