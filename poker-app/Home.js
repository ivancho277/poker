import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainNavigator from './App';
class Home extends Component {
    static navigationOptions = {
        title: "Welcome"
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Game Screen"
                onPress={() => navigate('Game')}
            />
        )
    }
}

export default Home;