import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Home extends React.Component {
    static navigationOptions = {
        title: "Welcome"
    };
    render(){
        const {navigate} = this.props.navigation;
        return(
            <Button
            title="Go to Game Screen"
            onPress={() => navigate('Game')}
            />
        )
    }
}