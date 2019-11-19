import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
import { TextInput } from 'react-native-gesture-handler';
import { MyContext } from './stateContext/GlobalState';
import { AntDesign } from '@expo/vector-icons';

const storage = require("./components/AsyncStorageController.js");
const calculation = require('./components/statscalculation.js')

//  const context = useContext(MyContext)



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

    newTagsLog = (allGames, tag) => {
        return calculation.findTag(allGames, tag);
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
                <AntDesign name="doubleright" size={32} color="green"> </AntDesign>

                <Text>POKER TRACKER</Text>
                <TextInput
                    style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Search by tag"
                    onChangeText={(tagsearch) => this.setState({ tagsearch })}
                    value={this.state.tagsearch}
                />
                <MyContext.Consumer>
                    {(context) => <Button title="search" onPress={() => console.log(this.newTagsLog(context.state.gamesObj, this.state.tagsearch))} style={{ float: 'right' }} />}
                </MyContext.Consumer>
                <StatsBox logTags={this.logTags} logTotalsByPosition={this.logTotalsByPosition} logTagsTotals={this.logTagsTotals} height={300} width={170} />
                <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                <Text>ReRender global state</Text>

                <MyContext.Consumer>
                    {(context) => <TouchableOpacity onPress={() => { console.log('AhAHA', context.state); context.remount() }}>
                        <Text>Press me</Text>
                    </TouchableOpacity>}
                </MyContext.Consumer>
                <TouchableOpacity onPress={() => { storage.removeData(); storage.removeCurrentGame() }}>
                    <Text style={{ color: 'red' }}>Delete storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen; 