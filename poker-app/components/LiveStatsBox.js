import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, ImageBackground } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
const calculation = require('./statscalculation.js');
const storage = require("./AsyncStorageController.js");


let table = {
    "0": "Big Blind",
    "1": "Small Blind",
    "2": "Dealer",
    "3": "D+1",
    "4": "D+2",
    "5": "D+3",
    "6": "D+4",
    "7": "D+5"
}

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            searchedTag: {},
            displayChange: false
        }
    }


    componentDidMount() {
        storage.retrieveData().then((res) => {
            console.log(JSON.parse(res));
            this.setState({
                gamesObj: JSON.parse(res),
                loading: false,
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



    currentPositionDisplay(position) {
        let allGames = this.logTotalsByPosition();
        console.log(position)
        return <Text>
            {table[position]}: Calls: {allGames[position].total_calls}, Folds: {allGames[position].total_folds}, Raises: {allGames[position].total_raises}
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
    componentDidUpdate() {
        console.log("MOOOO")
        console.log(this.props.currentGame)
        //  console.log("WHAT ARE PROPS", this.props.position)
    }

    currentGameDisplay(position) {
        console.log("SEE HERE")
        console.log(this.props.currentGame)
        if (!this.isEmpty(this.props.currentGame)) {
            return <Text>
                {table[position]}: Calls: {this.props.currentGame[position].calls}, Folds: {this.props.currentGame[position].folds}, Raises: {this.props.currentGame[position].raises}
            </Text>

        } else return <Text>New Game</Text>
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
                        this.isEmpty(this.props.currentGame) && this.isEmpty(this.state.gamesObj)
                            ?
                            <Text>Nothing here</Text>
                            :
                            this.state.displayChange ?
                                <Text>
                                    Current Overall Stats: {'\n'}
                                    {this.currentPositionDisplay(this.props.position)} {'\n'}

                                </Text>
                                :
                                <Text>
                                    Current Game Stats: {'\n'}
                                    {this.currentGameDisplay(this.props.position)}
                                </Text>

                    }
                    <ToggleSwitch
                        isOn={this.state.displayChange}
                        onColor="green"
                        offColor="red"
                        label="Change View"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="mediuim"
                        onToggle={displayChange => {
                            this.setState({ displayChange });
                            this.onToggle(displayChange);
                        }}
                    />


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