import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    state = {

    }
    render() {
        return (

            <View style={boxStyles.container}>
                <Text > textInComponent </Text>
            </View>

        )
    }
}

const boxStyles = StyleSheet.create({
    container: {
        color: '#32CD32',
        width: '150px',
        height: '150px',
        borderColor: '#000000',
        borderWidth: 3,
        borderStyle: 'solid'
    }
})