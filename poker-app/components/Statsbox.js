import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    state = {
        calls: this.props.games.calls,
        folds: this.props.games.folds,
        raises: this.props.games.raises
    }
    render() {
        return (

            <View style={boxStyles.container}>
                <Text style={{justifyContent: 'center'}} > textInComponent {'\n'}
                    calls: {this.state.calls} {'\n'}
                    folds: {this.state.folds} {'\n'}
                    raises: {this.state.raises} 
                
                </Text>
            </View>

        )
    }
}

const boxStyles = StyleSheet.create({
    container: {
        color: '#32CD32',
        width: 150,
        height: 150,
        borderColor: '#000000',
        borderWidth: 3,
        borderStyle: 'solid'
    }
})