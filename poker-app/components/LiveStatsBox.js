import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, ImageBackground } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Divider from 'react-native-divider';
import * as calculation from './statscalculation.js'
import * as storage from './AsyncStorageController.js'
// const calculation = require('./statscalculation.js');
// const storage = require("./AsyncStorageController.js");


let table = {
    "0": "Big Blind",
    "1": "Small Blind",
    "2": "Dealer",
    "3": "D+1",
    "4": "D+2",
    "5": "D+3",
    "6": "D+4",
    "7": "D+5",
    "8": "D+6",
}

export default class Statsbox extends Component {
    //will pull saved information about users stats and display them back in the box.   
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            displayChange: false,
        }
    }


    componentDidMount() {
        this.setState({gamesObj: this.props.getGamesObj, loading: false})
        // storage.retrieveData().then((res) => {
        //     if (res != undefined) {
        //         console.log(JSON.parse(res));
        //         this.setState({
        //             gamesObj: JSON.parse(res),
        //             loading: false,
        //         })
        //         console.log("THIS IS ASYNC")
        //         console.log(this.state.gamesObj)
        //     } else {
        //         this.setState({ loading: false })
        //     }
        // }).catch((error) => {
        //     console.log("HOME SCREEN ERROR");
        //     throw error;
        // })

    }

    logTotalsByPosition() {
        //console.log(calculation.calculateByPosition(this.state.gamesObj));
        return calculation.calculateByPosition(this.state.gamesObj);
    }

    logPercentagesByPosition() {
        return calculation.calcPercentByPosition(this.state.gamesObj);
    }



    currentPositionDisplay(position) {
        //let allGames = this.logTotalsByPosition();
        let allGames = this.logPercentagesByPosition();
        if (this.isEmpty(allGames)) {
            return <Text>No Saved Games</Text>
        }
        else {
            console.log("POSITION")
            console.log(allGames)
            console.log(position)
            let allGamesArray = Object.keys(allGames).map(key => {
                let newkey = String(key)
                console.log(newkey)
                newkey = { key: key }
                return Object.assign(newkey, allGames[key]);
            })
            console.log("HAHAHAHAA")
            console.log(allGamesArray)
            return <Text>
                {allGamesArray.map(game => {
                    return `${game.key}s: ${game[position]}%  `
                })
                }

            </Text>
        }
    }

    logTagsTotals() {
        if (this.props.tags.length >= 0) {
            return calculation.includesAllTags(this.state.gamesObj, this.props.tags)
        } else {
            return calculation.includesAllTags(this.state.gamesObj, ['default'])

        }
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
        console.log(this.props.currentActions)
        //  console.log("WHAT ARE PROPS", this.props.position)
    }
    /**
     * * Fix this .map of undefined. Check how we are getting currentGame to here.
     * 
     * @param {integer} position 
     */
    currentGameDisplay(position) {
        console.log("SEE HERE")
        console.log(this.props.currentActions)
        if (!this.isEmpty(this.props.currentActions)) {
            return <Text>

                {this.props.currentActions.map(game => {
                    return `${game.actionName}: ${game.countPerPosition[position]}   `
                })}

            </Text>

        } else return <Text>New Game</Text>
    }
    onToggle(isOn) {
        console.log("Changed to " + isOn);
    }

    render() {
        return (
            <View style={{ height: 200, color: '#32CD32', width: "85%" , padding: 10, marginBottom: 20 }}>
                {this.state.loading
                    ?
                    <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                        <ActivityIndicator size='small' color='#0000ff' />
                    </View>
                    :
                    this.isEmpty(this.props.currentActions) && this.isEmpty(this.state.gamesObj)
                        ?
                        <Divider>Nothing in storage</Divider>
                        :
                        this.state.displayChange ?

                            this.props.tags.length > 0 ?
                                <View>
                                    <Divider>Current Tags {'\n'}</Divider>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        {this.props.tags.map((tag, i) => {
                                            if (i == this.props.tags.length - 1) {
                                                return <Text key={tag}>{tag}</Text>
                                            } else {
                                                return <Text key={tag}>{tag}, </Text>
                                            }
                                        })}

                                    </View>
                                </View>
                                :
                                <Divider>NO TAGS</Divider>
                            :

                            <View>
                                <Divider>Overall Stats: {table[this.props.position]}</Divider>
                                <Text>
                                    {this.currentPositionDisplay(this.props.position)} {'\n'}

                                </Text>
                                <Divider>Current Game: {table[this.props.position]}{'\n'}</Divider>
                                <Text>

                                    {this.currentGameDisplay(this.props.position)}
                                </Text>
                            </View>


                }
                <ToggleSwitch
                    isOn={this.state.displayChange}
                    onColor="green"
                    offColor="red"
                    label="View current tags"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="mediuim"
                    onToggle={displayChange => {
                        this.setState({ displayChange });
                        this.onToggle(displayChange);
                    }}
                />

                {/* <Button title='check tags included' onPress={() => console.log(this.logTagsTotals())}></Button> */}
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