import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
import { TextInput } from 'react-native-gesture-handler';
import { MyContext } from './stateContext/GlobalState'
const storage = require("./components/AsyncStorageController.js");
const calculation = require('./components/statscalculation.js')
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            totals: {},
            tagsearch: ''
        }
    }

    // componentDidMount() {
    //     storage.retrieveData().then((res) => {
    //         console.log(JSON.parse(res));
    //         let temp = calculation.calculateByPosition(JSON.parse(res))
    //         this.setState({
    //             gamesObj: JSON.parse(res),
    //             loading: false,
    //             totals: temp
    //         })
    //         console.log("THIS IS ASYNC")
    //         console.log(this.state.gamesObj)
    //     }).catch((error) => {
    //         console.log("HOME SCREEN ERROR");
    //         throw error;
    //     })
    // }
    // logTotalsByPosition = () => {
    //     console.log(calculation.calculateByPosition(this.state.gamesObj));
    //     return calculation.calculateByPosition(this.state.gamesObj);
    // }

    logTagsTotals = () => {
        this.logTags().then((res) => {
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

    conextRender = (cb) => {
        cb()
    } 

    logTags = async () => {
        let tags = await storage.retrieveData().then((res) => {
            console.log("HEY CHECK ME OUT");
            console.log(JSON.parse(res), this.state.tagsearch)
            const data = JSON.parse(res)
            let byTag = calculation.findTag(data, this.state.tagsearch);
            console.log(byTag);
            return byTag;
        }).catch(err => {
            console.log("nothing here");
            throw err;
        })
        return tags;
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <TextInput
                    style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Search by tag"
                    onChangeText={(tagsearch) => this.setState({ tagsearch })}
                    value={this.state.tagsearch}
                />
                {/* <Button title="search" onPress={() => this.logTags()} style={{ float: 'right' }} /> */}
                <StatsBox logTags={this.logTags} logTotalsByPosition={this.logTotalsByPosition} logTagsTotals={this.logTagsTotals} height={300} width={170} />
                <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                <Text>ReRender global state</Text>

                <MyContext.Consumer>
                    {(context) => <TouchableOpacity onPress={() => { console.log('AhAHA', context.state); context.remount() }}>
                        <Text>Press me</Text>
                    </TouchableOpacity>}
                </MyContext.Consumer>
                <TouchableOpacity onPress={() => storage.removeData()}>
                    <Text style={{ color: 'red' }}>Delete storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen; 