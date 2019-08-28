import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
const calculation = require('./statscalculation.js');
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

    componentDidMount() {
        //const allData = calculation.calculateTotalStats(this.props.games((res) => { return res }));
        
        // this.setState({
        //     calls: allData.calls,
        //     folds: allData.folds,
        //     raises: allData.raises
        // }) 
    }
    render() {
        return (
            <View style={boxStyles.container}>
                <View  style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                    <ActivityIndicator size='small' color='#0000ff' />
                </View>
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