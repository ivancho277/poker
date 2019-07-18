import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Game extends React.Component {
    static navigationOptions = {
        title: "Welcome"
    };
    render(){
        const {navigate} = this.props.navigation;
        return(
            <Button
            title="Go to Home Screen"
            onPress={() => navigate('Home')}
            />
        )
    }
}