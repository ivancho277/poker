import React, { Component } from 'react';
import { View, Text, Button, TextInput, onLongPress } from 'react-native';
import Radio from './Radio.js';
import { MyContext } from '../stateContext/GlobalState';
import { AntDesign } from '@expo/vector-icons';
const storageController = require('./AsyncStorageController.js')
const gameConstructors = require('./gameObjects.js');
const { gameStats, Action } = gameConstructors;



// const AddAction =  <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onPress={() => { console.log("pressed") }}>
//         Add Action
//     </AntDesign.Button>





export default class PracticeButtonController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //call: 0,
            //fold: 0,
            //raise: 0,
            actions: [],
            actionStrings: [],
            tag: "",
            tags: this.props.tags,
            gamesArray: [],
            position: 0,
            currentGame: {},
            currentTime: new Date(),
            previousTime: new Date(),
            actionInputOpen: false,
            showModal: false,
            actionToAdd: ''
        };
    };

    async populateGames() {
        await storageController.retrieveData().then((res) => {
            if (res != undefined) {
                let pastGames = JSON.parse(res);
                console.log("populate function");
                let arrayOfgames = [];
                if (pastGames.games) {
                    pastGames.games.forEach(game => {
                        arrayOfgames.push(game);
                        console.log(game)
                    })
                }
                console.log("TAKE A LOOK")
                console.log(arrayOfgames)
                console.log(res)
                console.log(pastGames)
                this.setState({
                    gamesArray: arrayOfgames,
                });
            }
        }).catch((error) => {
            alert("populate error");
            if (this.state.actions.length <= 3) {
                this.retrieveActions();
            }
            throw error;
        })
    }

    async retrieveCurrentGame() {
        let game = await storageController.retrieveCurrentGame().then((res) => {
            let currentgame = JSON.parse(res);
            console.log("LOOOOOOGGGGGG")
            //console.log(currentgame.actions)
            //console.log(JSON.parse(res))
            if (currentgame) {
                let pastactions = currentgame.actions.map((action) => {
                    return new Action(action.actionName, action.count, action.countPerPosition)
                })

                this.setState({
                    currentGame: currentgame,
                    actions: pastactions,
                    tags: currentgame.tags
                }, () => { this.props.setLiveGamePosition(this.state.actions, this.state.tags) })
            }
            return res;
        }).catch(err => {
            throw err;
        })
        return game === null ? true : false
    }


    async retrieveActions() {
        await storageController.retrieveActions().then((res) => {
            if (!res) {
                console.log("AHSHAHSSAH")
                console.log(res)
                storageController.resetActions();
                this.setState({
                    actions: [new Action('call'), new Action('fold'), new Action('raise')]
                }, () => { alert('Your actions were reset') })
            } else {
                let actions = JSON.parse(res).map(action => {
                    return new Action(action)
                });
                this.setState({
                    actions: actions,
                    actionStrings: JSON.parse(res)
                })
            }
        })
    }

    componentDidMount() {
        this.populateGames().then(() => {
            console.log("LOOK UNDER");
            console.log(this.state.gamesArray)
            this.retrieveCurrentGame().then(res => {
                console.log("MY RESPONSE", res)
                if (!!res) {
                    this.retrieveActions().then((res) => {
                        console.log('actions')
                    })
                }
            })

        })
    }



    toBeSaved = (shouldReturn = false) => {
        let date = new Date();
        let temp = new gameStats(this.state.actions, this.state.tags);
        let totals = this.state.actions.map((action) => {
            return { [action.actionName]: action.getTotalCount() }
        })
        let tagsToSave = this.props.tags.length === 0 ? this.props.tags.concat('default') : this.props.tags

        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            tags: tagsToSave,
            game: temp.getCurrentStats(),
            totals: totals
        }
        console.log(temp.getCurrentStats())
        let gamesarr = this.state.gamesArray.concat(gamesObj);
        let saveObj = {
            version: "1.0.3",
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
        let temp = new gameStats(this.state.actions, this.state.tags);
        console.log("TAGS: ", temp.getTags())
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            tags: this.props.tags,
            currentGame: temp.getCurrentStats(),
            actions: this.state.actions
        }
        console.log("HOLLLY MOLLY")
        //console.log(temp.getCurrentStats())
        console.log(gamesObj)
        storageController.saveCurrentGame(gamesObj)
    }


    getPosition = (position) => {
        this.setState({
            position: position
        })
        this.props.setPosition(position);
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


    onActionClick(action) {

    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    saveActions(action) {
        if (action != "") {
            let newActions = this.state.actionStrings.concat(action);
            this.setState({ actionStrings: newActions });
            storageController.saveActions(newActions);
        }

    }

    render() {
        return (
            <View>

                {/* <Text> PracticeButtonController </Text> */}
                <Text>{'\n'}</Text>
                {/* <View  style={{ flexDirection: "row", justifyContent: 'space-evenly', }}> */}

                <View>
                    {this.state.actions ?
                        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start', alignItems: 'center', flexWrap: 'wrap', height: 'auto', width: '90%' }}>
                            {this.state.actions.map((action, index) => {
                                return (
                                    <View key={index}>
                                        <Button style={{ width: 30 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { console.log(`you clicked ${action.actionName}`); action.incrementActionAtPosition(this.state.position); this.setState({ currentTime: new Date() }); this.props.setPosition(this.state.position); this.props.setLiveGamePosition(this.state.actions, this.props.tags); console.log(action) }} />
                                    </View>
                                )
                            })}
                            <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onLongPress={() => { this.setState({ actionInputOpen: true }) }} onPress={() => { console.log("pressed") }}></AntDesign.Button>
                        </View>

                        :
                        <Text>Loading....</Text>
                    }
                </View>
                <Text>{'\n'}</Text>
                {this.state.actionInputOpen ?
                    <View>
                        <TextInput
                            style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                            placeholder='Add a new game Action'
                            onChangeText={(actionToAdd) => this.setState({ actionToAdd })}
                            value={this.state.actionToAdd}
                        />
                        <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="add action" onPress={() => { this.state.actionToAdd != "" ? this.saveActions(this.state.actionToAdd.toLowerCase().trim()) & this.setState({ actionInputOpen: false, actions: this.state.actions.concat(new Action(this.state.actionToAdd)), actionToAdd: '' }) : this.setState({ actionInputOpen: false }) }} />
                    </View>
                    :
                    <Text></Text>

                }
                <Text>{'\n'}</Text>
                <View>
                    <Radio getPosition={this.getPosition} shouldPositionIncrement={this.shouldPositionIncrement} />
                </View>
                <MyContext.Consumer >
                    {(context) => <Button title='Save Data. End game.' onPress={() => { storageController.removeCurrentGame(); this.toBeSaved(); context.updateGames(this.toBeSaved(true)); this.props.goHome() }} />}
                </MyContext.Consumer>
            </View>
        );
    }
}