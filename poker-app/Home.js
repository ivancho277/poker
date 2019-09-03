import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
import { TextInput } from 'react-native-gesture-handler';
const storage = require("./components/AsyncStorageController.js");
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {
                
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


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to Poker</Text>
                <TextInput
                    style={{ float: 'left', height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Search by tag"
                    onChangeText={(tagsearch) => this.setState({ tagsearch })}
                    value={this.state.tagsearch}
                />
                <Button title="search" style={{ float: 'right'}} />
                <StatsBox />
                <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                <TouchableOpacity onPress={this.componentDidMount}>
                    <Text>Get All data from storage</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => storage.removeData()}>
                    <Text>Delete storage</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen; 