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

    conextRender = (cb) => {
        cb()
    }

    logTags = (allGames, tag) => {
        return calculation.findTag(allGames, tag);
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
                    {(context) => <Button title="search tags" onPress={() => console.log(this.logTags(context.state.gamesObj, this.state.tagsearch))} style={{ float: 'right' }} />}
                </MyContext.Consumer>
                <StatsBox logTotalsByPosition={this.logTotalsByPosition} height={300} width={170} />
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