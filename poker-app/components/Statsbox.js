import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, ImageBackground } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
const calculation = require('./statscalculation.js');
const storage = require("./AsyncStorageController.js");
const cardImg = require('../images/ace_diamond.jpg');


export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            searchedTag: {},
            totals: {},
            isOnPositionStats: false
        }
    }


    componentDidMount() {
        storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));
            let temp = calculation.calculateByPosition(JSON.parse(res))
            this.setState({
                gamesObj: JSON.parse(res),
                loading: false,
                totals: temp
            })
            console.log("THIS IS ASYNC")
            console.log(this.state.gamesObj)
        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            throw error;
        })
    }

    logTotalsByPosition() {
        console.log(calculation.calculateByPosition(this.state.gamesObj));
        return calculation.calculateByPosition(this.state.gamesObj);
    }

    logTagsTotals() {
        this.props.logTags().then((res) => {
            console.log("FOUNDDDDD");
            console.log(res);
            let obj = {
                games: res
            }
            let totals = calculation.calculateTotalStats(obj);
            console.log("calls " + totals.calls);
            console.log("folds " + totals.folds);
            console.log("raises " + totals.raises);
            this.setState({
                gamesObj: obj
            });
        }).catch(err => {
            console.log("error searching for tag");
            throw err;
        })
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

                <ImageBackground style={{ flex: 1, height: '100%', width: '100%' }} source={cardImg}>
                    {this.state.loading
                        ?
                        <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                            <ActivityIndicator size='small' color='#0000ff' />
                        </View>
                        :
                        this.isEmpty(this.state.gamesObj) || this.state.gamesObj === [{}]
                            ?
                            <Text>Nothing here</Text>
                            :
                            this.state.isOnPositionStats === true
                                ?
                                <Text>
                                    Stats by position: {'\n'}
                                    BB: C: {this.state.totals[0].total_calls}, F: {this.state.totals[0].total_folds}, R: {this.state.totals[0].total_raises} {'\n'}
                                    SB: C: {this.state.totals[1].total_calls}, F: {this.state.totals[1].total_folds}, R: {this.state.totals[1].total_raises} {'\n'}
                                    D: C: {this.state.totals[2].total_calls}, F: {this.state.totals[2].total_folds}, R: {this.state.totals[2].total_raises} {'\n'}
                                    D+1: C: {this.state.totals[3].total_calls}, F: {this.state.totals[3].total_folds}, R: {this.state.totals[3].total_raises} {'\n'}
                                    D+2: C: {this.state.totals[4].total_calls}, F: {this.state.totals[4].total_folds}, R: {this.state.totals[4].total_raises} {'\n'}
                                    D+3: C: {this.state.totals[5].total_calls}, F: {this.state.totals[5].total_folds}, R: {this.state.totals[5].total_raises} {'\n'}
                                    D+4: C: {this.state.totals[6].total_calls}, F: {this.state.totals[6].total_folds}, R: {this.state.totals[6].total_raises} {'\n'}
                                    D+5: C: {this.state.totals[7].total_calls}, F: {this.state.totals[7].total_folds}, R: {this.state.totals[7].total_raises} {'\n'}
                                </Text>
                                :
                                <Text style={{ justifyContent: 'center' }} >
                                    Total Stats:{'\n'}
                                    calls: {calculation.calculateTotalStats(this.state.gamesObj).calls} {'\n'}
                                    folds: {calculation.calculateTotalStats(this.state.gamesObj).folds} {'\n'}
                                    raises: {calculation.calculateTotalStats(this.state.gamesObj).raises} {'\n'}
                                    tags:
                </Text>
                    }
                    <Button title="log position stats" onPress={() => this.logTotalsByPosition()}></Button>
                    <Button title="search tags" onPress={() => this.logTagsTotals()} />
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