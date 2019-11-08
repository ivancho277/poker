import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Radio from './Radio.js';
import { MyContext } from '../stateContext/GlobalState';
import TagsModal from './TagsModal.js';
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
            tags: this.props.tags,
            gamesArray: [],
            position: 0,
            currentGame: {
                0: new gameStats,
                1: new gameStats,
                2: new gameStats,
                3: new gameStats,
                4: new gameStats,
                5: new gameStats,
                6: new gameStats,
                7: new gameStats,
            },
            currentTime: new Date(),
            previousTime: new Date(),
            tagInputOpen: false,
            showModal: false,
        };
    };

    async populateGames() {
        await storageController.retrieveData().then((res) => {
            let pastGames = JSON.parse(res);
            console.log("populate function");
            let arrayOfgames = [];
            if (pastGames.games) {
                pastGames.games.forEach(game => {
                    arrayOfgames.push(game);
                    console.log(game)
                })
                console.log("TAKE A LOOK")
                console.log(arrayOfgames)
                console.log(res)
                console.log(pastGames)
                this.setState({
                    gamesArray: arrayOfgames,
                });
                storageController.retrieveCurrentGame().then((res) => {
                    let currentgame = JSON.parse(res);
                    console.log("LOOOOOOGGGGGG")
                    console.log(JSON.parse(res))
                    if (currentgame) {
                        this.setState({
                            currentGame: currentgame.currentGame,
                            calls: currentgame.calls,
                            folds: currentgame.folds,
                            raises: currentgame.raises
                        })
                    }
                });


            }
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

    toBeSaved = (shouldReturn = false) => {
        let date = new Date();
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            calls: this.state.calls,
            folds: this.state.folds,
            raises: this.state.raises,
            tags: this.state.tags,
            currentGame: this.state.currentGame,
        }
        //debugger;

        let gamesarr = this.state.gamesArray.concat(gamesObj);
        let saveObj = {
            version: "1.0.2",
            games: gamesarr
        }
        console.log("LOOOK")
        console.log(gamesarr)
        if (shouldReturn) {
            return saveObj;
        } else {
            storageController.saveData(saveObj);

        }
        //debugger
    };

    saveCurrentGame() {
        let date = new Date();
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            calls: this.state.calls,
            folds: this.state.folds,
            raises: this.state.raises,
            tags: this.state.tags,
            currentGame: this.state.currentGame,
            
        }
        storageController.saveCurrentGame(gamesObj)
    }



    clearTags() {
        this.setState({
            tag: ''
        })
    }

    getPosition = (position) => {
        this.setState({
            position: position
        })
        this.props.setPosition(position);
    }

    incrementcurrentGame(position, pressedButton) {
        //debugger
        if (pressedButton === "call") {
            ++this.state.currentGame[position].calls;
        }
        else if (pressedButton === "fold") {
            ++this.state.currentGame[position].folds;
        }
        else if (pressedButton === "raise") {
            ++this.state.currentGame[position].raises;
        }
    }



    shouldPositionIncrement = (cb) => {
        if (this.state.currentTime.getTime() != this.state.previousTime.getTime()) {
            cb(this.state.position)
            //this.toBeSaved();
            this.saveCurrentGame();
            this.setState({
                previousTime: this.state.currentTime
            })
        }
    }
    renderTagInput() {
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Type your tags here"
                    onChangeText={(tag) => this.setState({ tag })}
                    value={this.state.tag}
                />
                <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.clearTags(); this.setState({ tagInputOpen: false }) }} />
            </View>
        )
    }



    render() {
        return (
            <View>

                {/* <Text> PracticeButtonController </Text> */}
                <Text>{'\n'}</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly', }}>
                    <Button title={`call, #${this.state.calls}`} onPress={() => { this.setState({ calls: ++this.state.calls, currentTime: new Date() }); this.incrementcurrentGame(this.state.position, 'call'); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.currentGame) }} />
                    <Button title={`fold, #${this.state.folds}`} onPress={() => { this.setState({ folds: ++this.state.folds, currentTime: new Date() }); this.incrementcurrentGame(this.state.position, 'fold'); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.currentGame) }} />
                    <Button title={`raise, #${this.state.raises}`} onPress={() => { this.setState({ raises: ++this.state.raises, currentTime: new Date() }); this.incrementcurrentGame(this.state.position, 'raise'); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.currentGame) }} />
                </View>
                <Text>{'\n'}</Text>
                <View>
                    <Radio getPosition={this.getPosition} shouldPositionIncrement={this.shouldPositionIncrement} />
                </View>
                <MyContext.Consumer >
                    {(context) => <Button title='Save Data. End game.' onPress={() => { storageController.removeCurrentGame(); this.toBeSaved() ; context.updateGames(this.toBeSaved(true)) ; this.props.goHome() }} />}
                </MyContext.Consumer>
            </View>
        );
    }
}