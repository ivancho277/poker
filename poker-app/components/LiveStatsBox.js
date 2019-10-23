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

    currentPositionDisplay(position){
        let allGames = this.logTotalsByPosition();
        return <Text>
            Position: {position}, Calls: {allGames[position].total_calls}, Folds: {allGames[position].total_folds}, Raises: {allGames[position].total_raises}
        </Text>
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
                        <Text>
                            Stats by position: {'\n'}
                            {this.currentPositionDisplay(0)} {'\n'}
                            {this.currentPositionDisplay(1)} {'\n'}
                            {this.currentPositionDisplay(2)} {'\n'}
                        </Text>
                }
                {/* <Button title="log position stats" onPress={() => this.logTotalsByPosition()}></Button>
                <Button title="search tags" onPress={() => this.logTagsTotals()} /> */}
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