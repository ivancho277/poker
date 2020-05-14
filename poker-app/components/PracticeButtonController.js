import React, { Component, useContext } from 'react';
import { View, Text, TextInput, onLongPress } from 'react-native';
import Radio from './Radio.js';
import { Button } from 'react-native-elements';

import { MyContext } from '../stateContext/GlobalState';
import { AntDesign } from '@expo/vector-icons';
import * as storageController from './storageAPI/AsyncStorageController.js';
import * as calculations from './statscalculation.js';
// const storageController = require('./AsyncStorageController.js')
// const calculations = require('./statscalculation.js')
const gameConstructors = require('./gameObjects.js');
const { GameStats, Action, Game } = gameConstructors;



// const AddAction =  <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onPress={() => { console.log("pressed") }}>
//         Add Action
//     </AntDesign.Button>




// const global = useContext(MyContext);
// const {currentTags} = global.state
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
            actionToAdd: '',
            doneLoading: false
        };
    };



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
                    doneLoading: true,
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


    /**
     *
     *
     * @returns
     * @memberof PracticeButtonController
    //  */
    checkforCurrentGame() {
        if (this.props.context.state.currentGame) {
            let pastactions = this.props.context.state.currentGame.actions.map((action) => {
                return new Action(action.actionName, action.count, action.countPerPosition)
            })
            this.setState({
                currentGame: this.props.context.state.currentGame,
                doneLoading: true,
                actions: pastactions,
                tags: this.props.context.state.currentGame.tags
            }, () => { this.props.setLiveGamePosition(this.state.actions) })
            return false;
            debugger
        }
        else {
            this.setState({
                doneLoading: true,

            });
            return true
        }
    }
    setActions() {

        if (this.props.context.state.currentGame) {
            let actions = this.props.context.state.actions.map(action => {
                return new Action(action)
            })
            this.setState({
                actions: this.props.context.state.currentGame.actions,
                actionStrings: this.props.context.state.actions

            })
        }
        else {
            let actions = this.props.context.state.actions.map(action => {
                return new Action(action)
            })
            this.setState({
                actions: actions,
                actionStrings: this.props.context.state.actions

            })
        }
    }

    componentDidMount() {
        //this.setActions();
        this.setState({ doneLoading: true })
        console.log("PBCCCC", this.props.context);


    }


    componentDidUpdate() {
        if (this.state.actionInputOpen !== this.props.actionInputOpen) {
            this.setState({ actionInputOpen: this.props.actionInputOpen })
        }
    }


    /**
     * !!!! NEW SAVE METHODS WILL RESTRUCTURE STORAGE !!!
     */
    SaveAllGames = () => {
        //*this Game instance might actually come from contect state.
        const GameToSave = new Game(this.props.currentActions, this.props.tags, this.props.position, "1.0.5", new Date())
        const totals = GameToSave.actions.map(action => {
            return { [action.actionName]: action.getTotalCount() }
        });
        const gameStats = GameToSave.getCurrentStats();
        this.props.tags.length === 0 ? GameToSave.addTag(this.props.tags.concat('default')) : GameToSave.addTag(this.props.tags);
        const gamesObj = {
            gameRaw: GameToSave,
            totals: totals,
            game: gameStats,
            tags: GameToSave.getTags(),
            version: GameToSave.getVersion(),
            time: GameToSave.date.toDateString(),
            date: GameToSave.date.getTime()
        }
        const updatedGamesList = this.props.getGames.concat(gamesObj);
        this.props.updateGames({ games: updatedGamesList, currentVersion: '1.0.5' })

    }

    CurrentGameSave = () => {
        const date = new Date();
        const currentgame = new Game(this.props.currentActions, this.props.tags, this.props.position, "1.0.5", date);
        const gamesObj = {
            rawGameData: currentgame,
            date: date.toDateString(),
            time: date.getTime(),
            tags: currentgame.getTags(),
            currentGame: currentgame.getCurrentStats(),
            actions: currentgame.getAllActions(),
            actionStrings: currentgame.getActionsAsList()
        }

        this.props.context.modifiers.updateCurrentGame(gamesObj)

    }







    //!!!!!!!!!!! OLD SAVE
    
    saveAllGames = (shouldReturn = false) => {
        let date = new Date();
        //let thisgame = new Game(this.props.currentActions. this.)
        let temp = new GameStats(this.props.currentActions, this.state.tags);
        let totals = this.props.currentActions.map((action) => {
            return { [action.actionName]: action.getTotalCount() }
        })
        let tagsToSave = this.props.tags.length === 0 ? this.props.tags.concat('default') : this.props.tags
        console.log("RAWR", temp.getCurrentStats())
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            tags: tagsToSave,
            game: temp.getCurrentStats(),
            totals: totals,
            version: "1.0.4"
        }
        console.log(temp.getCurrentStats())
        let gamesarr = this.props.getGames.concat(gamesObj);
        let saveObj = {
            version: "1.0.4",
            games: gamesarr
        }
        console.log("LOOOK")
        console.log(gamesarr)
        if (shouldReturn) {
            return saveObj;
        } else {
            this.props.updateGames(saveObj);
            //storageController.saveData(saveObj);

        }
        //debugger
    };


    //!!!!!!!! OLD SAVE
    //TODO: also see if there is more apporpriate spot for this method as well.
    saveCurrentGame() {
        let date = new Date();
        let temp;
        temp = new GameStats(this.props.context.state.currentActions, this.props.context.state.currentTags)
        console.log("TAGS: ", temp.getTags())
        let gamesObj = {
            date: date.toDateString(),
            time: date.getTime(),
            tags: this.props.context.state.currentTags,
            currentGame: temp.getCurrentStats(),
            actions: this.props.context.state.currentActions,
            actionStrings: this.props.context.state.actionStrings
        }
        this.currentGameStats(this.props.gamesObj, gamesObj)
        console.log("HOLLLY MOLLY")
        //console.log(temp.getCurrentStats())
        console.log(gamesObj)
        this.props.context.modifiers.updateCurrentGame(gamesObj)
        //storageController.saveCurrentGame(gamesObj)
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
            //this.saveAllGames();
            this.CurrentGameSave();
            this.setState({
                previousTime: this.state.currentTime
            })
        }
    }






    /**
     *!Check setliveGameposition
     *TODO: only real state we have here is position
     * 
     * @param {*} action
     * @memberof PracticeButtonController
     */
    onActionClick(action) {
        console.log(`you clicked ${action.actionName}`);
        action.incrementActionAtPosition(this.state.position);
        this.setState({ currentTime: new Date() });
        this.props.setPosition(this.state.position);
        //this.props.setLiveGamePosition(this.state.actions);


        console.log(action)
    }

    currentGameStats(gamesObj, currentGame) {
        calculations.calcCurrentGamePercentages(gamesObj, currentGame);

    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    //FIXME: need to send to context
    saveActions(action) {
        if (action != "") {
            let newActions = this.state.actionStrings.concat(action);
            this.setState({ actionStrings: newActions });
            storageController.saveActions(newActions);
        }

    }

    //FIXME: need to have current game actions coming from parent component, not from this state, and increment it in parent component
    render() {
        return (
            this.state.doneLoading ?
                <View style={{ justifyContent: 'center', alignContent: 'center', display: 'flex', margin: 10 }}>
                    {/* <Text> PracticeButtonController </Text> */}
                    <Text>{'\n'}</Text>
                    {/* <View  style={{ flexDirection: "row", justifyContent: 'space-evenly', }}> */}
                    <View>
                        {
                       /*his.props.currentActions != null ?  */  this.props.currentActions.length > 0 ?
                                <View style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'black', margin: 5, display: "flex", flexDirection: 'row', zIndex: -1, justifyContent: 'space-evenly', alignItems: 'flex-start', alignItems: 'center', flexWrap: 'wrap', height: 'auto', width: '90%' }}>
                                    {this.props.currentActions.map((action, index) => {
                                        return (
                                            <View key={index}>
                                                <Button style={{ width: 30 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { this.onActionClick(action); }} />
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
                        <View style={{ position: "relative", zIndex: -1 }}>
                            <TextInput
                                style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid', }}
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
                    <View style={{ width: 150, marginLeft: 80, borderWidth: 2, borderStyle: 'solid', borderBottomColor: 'black', justifyContent: 'center', position: 'relative' }}>
                        <MyContext.Consumer >
                            {(context) => <Button title='Save, End game.' onPress={() => { context.modifiers.deleteCurrentGame(); this.SaveAllGames(); this.props.goHome() }} />}
                        </MyContext.Consumer>
                    </View>
                </View>
                :
                <Text> Loading ...</Text>
        );
    }
}