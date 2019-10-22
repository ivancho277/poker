import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
const calculation = require('./statscalculation.js');
const storage = require("./AsyncStorageController.js");

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            searchedTag: {},
            isOnPositionStats: false
        }
    }


    componentDidMount() {
        storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));
            this.setState({
                gamesObj: JSON.parse(res),
                loading: false
            })
            console.log("THIS IS ASYNC")
            console.log(this.state.gamesObj)
        }).catch((error) => {
            console.log("HOME SCREEN ERROR");
            throw error;
        })
    }

    logTotalsByPosition() {
        //console.log(calculation.calculateByPosition(this.state.gamesObj));
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
                            Big Blind: C: {this.logTotalsByPosition()[0].total_calls}, F: {this.logTotalsByPosition()[0].total_folds}, R: {this.logTotalsByPosition()[0].total_raises} {'\n'}
                            Small Blind: C: {this.logTotalsByPosition()[1].total_calls}, F: {this.logTotalsByPosition()[1].total_folds}, R: {this.logTotalsByPosition()[1].total_raises} {'\n'}
                            Dealer: C: {this.logTotalsByPosition()[2].total_calls}, F: {this.logTotalsByPosition()[2].total_folds}, R: {this.logTotalsByPosition()[2].total_raises} {'\n'}
                            D+1: C: {this.logTotalsByPosition()[3].total_calls}, F: {this.logTotalsByPosition()[3].total_folds}, R: {this.logTotalsByPosition()[3].total_raises} {'\n'}
                            D+2: C: {this.logTotalsByPosition()[4].total_calls}, F: {this.logTotalsByPosition()[4].total_folds}, R: {this.logTotalsByPosition()[4].total_raises} {'\n'}
                            D+3: C: {this.logTotalsByPosition()[5].total_calls}, F: {this.logTotalsByPosition()[5].total_folds}, R: {this.logTotalsByPosition()[5].total_raises} {'\n'}
                            D+4: C: {this.logTotalsByPosition()[6].total_calls}, F: {this.logTotalsByPosition()[6].total_folds}, R: {this.logTotalsByPosition()[6].total_raises} {'\n'}
                            D+5: C: {this.logTotalsByPosition()[7].total_calls}, F: {this.logTotalsByPosition()[7].total_folds}, R: {this.logTotalsByPosition()[7].total_raises} {'\n'}
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