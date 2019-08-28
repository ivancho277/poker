import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
const calculation = require('./statscalculation.js');
export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        //const allData = calculation.calculateTotalStats(this.props.games((res) => { return res }));

        this.setState({
            calls: this.props.games.calls,
            folds: this.props.games.folds,
            raises: this.props.games.raises
        })
    }
    render() {
        return (
            <View style={boxStyles.container}>
                {Object.entries(this.state).length === 0 && this.state.constructor === Object
                    ?
                    <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                        <ActivityIndicator size='small' color='#0000ff' />
                    </View>
                    :
                    <Text style={{ justifyContent: 'center' }} > textInComponent {'\n'}
                        calls: {this.state.calls} {'\n'}
                        folds: {this.state.folds} {'\n'}
                        raises: {this.state.raises} {'\n'}
                        tags:
                </Text>
                }
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

const spinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5
    }

});