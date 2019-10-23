import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Radio from './Radio.js'

const storageController = require('./AsyncStorageController.js')




function gameStats(calls = 0, folds = 0, raises = 0) {
        this.calls = calls,
        this.folds = folds,
        this.raises = raises
}




export default class PracticeButtonController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calls: 0,
            folds: 0,
            raises: 0,
            tag: "",
            tags: [],
            gamesArray: [],
            position: 0,
            positionStats: {
                0: new gameStats,
                1: new gameStats,
                2: new gameStats,
                3: new gameStats,
                4: new gameStats,
                5: new gameStats,
                6: new gameStats,
                7: new gameStats,
            }
        };
    };

    async populateGames() {
        await storageController.retrieveData().then((res) => {
            let pastGames = JSON.parse(res);
            console.log("populate function");
            let arrayOfgames = [];
            pastGames.games.forEach(game => {
                arrayOfgames.push(game);
                console.log(game)
            })
            console.log("TAKE A LOOK")
            console.log(arrayOfgames)
            console.log(res)
            console.log(pastGames)
            this.setState({
                gamesArray: arrayOfgames
            });
        }).catch((error) => {
            alert("populate error");
            throw error;
        })
    }

    componentDidMount() {
        this.populateGames().then(() => {
            console.log("LOOK UNDER");
            console.log(this.state.gamesArray)
        })
    }

    saveToTags(tag) {
        let tagsArray = this.state.tags;
        tagsArray.push(tag);
        this.setState({
            tags: tagsArray
        })
    };

    toBeSaved() {
        let date = new Date();
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            calls: this.state.calls,
            folds: this.state.folds,
            raises: this.state.raises,
            tags: this.state.tags,
            positionStats: this.state.positionStats
        }
        let gamesarr = this.state.gamesArray;
        console.log("LOOOK")
        console.log(gamesarr)
        gamesarr.push(gamesObj)
        let saveObj = {
            version: "1.0.2",
            games: gamesarr
        }
        return saveObj;
    };

    clearTags() {
        this.setState({
            tag: ''
        })
    }
    
     getPosition = (position) =>{
        this.setState({
            position: position
        })
    }

    incrementPositionStats(position, pressedButton) {
        //debugger
        if(pressedButton === "call"){
            ++this.state.positionStats[position].calls;
        }
        else if(pressedButton === "fold"){
            ++this.state.positionStats[position].folds;
        }
        else if(pressedButton === "raise"){
            ++this.state.positionStats[position].raises;
        }   
    }

    incrementPositionButton(cb){
        cb()
    }

    render() {
        return (
            <View>
                <Text> PracticeButtonController </Text>
                <TextInput
                    style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Type your tags here"
                    onChangeText={(tag) => this.setState({ tag })}
                    value={this.state.tag}
                />
                <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => this.saveToTags(this.state.tag) & this.clearTags()} />
                <View style={{ flexDirection: "row", justifyContent: 'center', }}>
                    <Button title={`call, #${this.state.calls}`} onPress={() => { this.setState({ calls: ++this.state.calls }); this.incrementPositionStats(this.state.position, 'call'); }} />
                    <Button title={`fold, #${this.state.folds}`} onPress={() => { this.setState({ folds: ++this.state.folds }); this.incrementPositionStats(this.state.position, 'fold');  }} />
                    <Button title={`raise, #${this.state.raises}`} onPress={() => { this.setState({ raises: ++this.state.raises }); this.incrementPositionStats(this.state.position, 'raise'); }} />
                </View>
                <View >
                    <Radio getPosition={this.getPosition} />
                </View>
                <Button title='Save Data. End game.' onPress={() => storageController.saveData(this.toBeSaved())} />

            </View>
        );
    }
}
