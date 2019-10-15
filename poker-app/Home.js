import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
import { TextInput } from 'react-native-gesture-handler';
const storage = require("./components/AsyncStorageController.js");
const calculations = require('./components/statscalculation.js')
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {
                calls: 0,
                folds: 0,
                raises: 0
            },
            tagsearch: ''
        }

    }


    // componentDidMount() {
    //     storage.retrieveData().then((res) => {
    //         console.log(JSON.parse(res));
    //         this.setState({
    //             gamesObj: JSON.parse(res),
    //             loading: false
    //         })
    //         console.log("THIS IS ASYNC")
    //         console.log(this.state.gamesObj)
    //     }).catch((error) => {
    //         console.log("HOME SCREEN ERROR");
    //         throw error;
    //     })
    // }

    logTags = async () => {
        
        let tags = await storage.retrieveData().then((res) => {
            console.log("HEY CHECK ME OUT");
            console.log(JSON.parse(res), this.state.tagsearch)
            const data = JSON.parse(res)
            let byTag = calculations.findTag(data, this.state.tagsearch);
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
                <Button title="search" onPress={() => this.logTags()} style={{ float: 'right' }} />
                <StatsBox logTags={this.logTags} height={100} />
                <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={this.componentDidMount}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => storage.removeData()}>
                    <Text style={{ color: 'red' }}>Delete storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen; 