import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, ImageBackground } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import { MyContext } from '../stateContext/GlobalState'
const calculation = require('./statscalculation.js');
const storage = require("./AsyncStorageController.js");
const cardImg = require('../images/ace_diamond.jpg');


export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            isOnPositionStats: false
        }
    }


    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    onToggle(isOn) {
        console.log("Changed to " + isOn);
    }

    render() {
        return (
            <View style={{ height: this.props.height, color: '#32CD32', width: this.props.width, borderColor: '#000000', borderWidth: 3, borderStyle: 'solid' }}>

                <MyContext.Consumer>
                    {(context) => <ImageBackground style={{ flex: 1, height: '100%', width: '100%' }} source={cardImg}>
                        {this.props.loading
                            ?
                            <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                                <ActivityIndicator size='small' color='#0000ff' />
                            </View>
                            :
                            this.isEmpty(this.props.gamesObj) || this.props.gamesObj === [{}]
                                ?
                                <Text>Nothing here</Text>
                                :
                                this.state.isOnPositionStats === true
                                    ?
                                    <Text>
                                        Stats by position: {'\n'}
                                        {/* BB: C: {this.props.totals[0].total_calls}, F: {this.props.totals[0].total_folds}, R: {this.props.totals[0].total_raises} {'\n'}
                                    SB: C: {this.props.totals[1].total_calls}, F: {this.props.totals[1].total_folds}, R: {this.props.totals[1].total_raises} {'\n'}
                                    D: C: {this.props.totals[2].total_calls}, F: {this.props.totals[2].total_folds}, R: {this.props.totals[2].total_raises} {'\n'}
                                    D+1: C: {this.props.totals[3].total_calls}, F: {this.props.totals[3].total_folds}, R: {this.props.totals[3].total_raises} {'\n'}
                                    D+2: C: {this.props.totals[4].total_calls}, F: {this.props.totals[4].total_folds}, R: {this.props.totals[4].total_raises} {'\n'}
                                    D+3: C: {this.props.totals[5].total_calls}, F: {this.props.totals[5].total_folds}, R: {this.props.totals[5].total_raises} {'\n'}
                                    D+4: C: {this.props.totals[6].total_calls}, F: {this.props.totals[6].total_folds}, R: {this.props.totals[6].total_raises} {'\n'}
                                    D+5: C: {this.props.totals[7].total_calls}, F: {this.props.totals[7].total_folds}, R: {this.props.totals[7].total_raises} {'\n'} */}
                                        Calls: {calculation.getPercentages(context.state.gamesObj).percentCalls}% {'\n'}
                                        Raises: {calculation.getPercentages(context.state.gamesObj).percentRaises}% {'\n'}
                                        Folds: {calculation.getPercentages(context.state.gamesObj).percentFolds}% {'\n'}

                                    </Text>
                                    :
                                    <Text style={{ justifyContent: 'center' }} >
                                        Total Stats:{'\n'}
                                        calls: {calculation.calculateTotalStats(this.props.gamesObj).calls} {'\n'}
                                        folds: {calculation.calculateTotalStats(this.props.gamesObj).folds}  {'\n'}
                                        raises: {calculation.calculateTotalStats(this.props.gamesObj).raises} {'\n'}
                                        tags:
                </Text>
                        }
                        <Button title="log position stats" onPress={() => this.props.logTotalsByPosition()}></Button>
                        <Button title="search tags" onPress={() => this.props.logTagsTotals()} />
                        <ToggleSwitch
                            isOn={this.state.isOnPositionStats}
                            onColor="green"
                            offColor="red"
                            label="Change View"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="mediuim"
                            onToggle={isOnPositionStats => {
                                this.setState({ isOnPositionStats });
                                this.onToggle(isOnPositionStats);
                            }}
                        />
                    </ ImageBackground>
                    }
                </MyContext.Consumer>

            </View>

        )
    }





}

const boxStyles = StyleSheet.create({
    container: {
        color: '#32CD32',
        width: 150,
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