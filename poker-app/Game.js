import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import PBC from './components/PracticeButtonController';
import LiveStatsBox from './components/LiveStatsBox';
const storage = require("./components/AsyncStorageController.js");
//import Controller from './components/Controller'
class GameScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            position: 0,
            currentGame: {}
        }
    }

    

    goHome = () => {
        this.props.navigation.navigate('Home');
    }
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
    

    componentDidUpdate(){
        // console.log("GAME SCREEN"); console.log(this.state.currentGame);
    }
    setPosition = (position) => {
        //  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO    " , position)
        this.setState({
            position: position
        })
    }

    setLiveGamePosition = (games) => {
        this.setState({
            currentGame: games
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 2, borderColor: 'blue', borderStyle: "solid" }}>
                <LiveStatsBox currentGame={this.state.currentGame} position={this.state.position} logTags={this.logTags} height={100} width={270} />
                {/* <Button title="log State" onPress={() => console.log(this.state.position)} /> */}
                <Text>Controller will go here</Text>
                <PBC setLiveGamePosition={this.setLiveGamePosition} goHome={this.goHome} setPosition={this.setPosition} goHome={this.goHome} />
                <Button title='Go to home screen' onPress={() => this.goHome()} />
            </View>
        )
    }
}

export default GameScreen;