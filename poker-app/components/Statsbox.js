import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            calls: 0,
            folds: 0,
            raises: 0
        };
    }

    // componentDidMount() {
    //     let obj = this.props.games();
    //     console.log("HELLO:" , obj) 
    //     this.setState({
    //         calls: obj.calls,
    //         folds: obj.folds,
    //         raises: obj.raises
    //     }) 
    // }
    render() {
        return (

            <View style={boxStyles.container}>
                <Text style={{ justifyContent: 'center' }} > textInComponent {'\n'}
                    calls: {this.props.games.calls} {'\n'}
                    folds: {this.props.games.folds} {'\n'}
                    raises: {this.props.games.raises} {'\n'}
                    tags: 
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