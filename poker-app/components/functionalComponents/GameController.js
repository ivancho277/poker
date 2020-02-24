import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, onLongPress } from 'react-native';
import Radio from '../Radio.js';
import { Button } from 'react-native-elements';
import { MyContext } from '../../stateContext/GlobalState';
import { AntDesign } from '@expo/vector-icons';
import * as storageController from '../AsyncStorageController.js';
import * as calculations from '../statscalculation.js';
// const storageController = require('./AsyncStorageController.js')
// const calculations = require('./statscalculation.js')
const gameConstructors = require('../gameObjects.js');
const { GameStats, Action, Game } = gameConstructors;
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore'




// const AddAction =  <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onPress={() => { console.log("pressed") }}>
//         Add Action
//     </AntDesign.Button>



// getPosition = (position) => {
//     this.setState({
//         position: position
//     })
//     this.props.setPosition(position);
// }

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






export const GameController = (props) => {
    const [state, actions] = UseGameStore();
    // const [loading, setLoading] = useState(true);
    // const [currentTime, setCurrentTime] = useState(new Date());
    // const [previousTime, setPreviousTime] = useState(new Date());
    // const [actionInputOpen, setActionInput] = useState(false);
    // const [actionToAdd, editActionToAdd] = useState('');
    // const [doneLoading, setDoneLoading] = useState(false);
    // const [position, setPosition] = useState();
    const [liveActions, setLiveActions] = useState();

    useEffect(() => {
        console.log("CONTROLLER STATE: ", state);
    }, [])


    shouldPositionIncrement = (cb) => {
        if (currentTime.getTime() != previousTime.getTime()) {
            cb(position)
            //this.saveAllGames();
            actions.saveCurrentGame();
            setPreviousTime(currentTime)
        }
    }

    getPosition = (position) => {
        // this.setState({
        //     position: position
        // })
        // this.props.setPosition(position);
    }


    buildActions = (actionsStrings) => {
        const actions = actionStrings.map(action => {
            return new Action(action);
        })
        setLiveActions(actions);

    }

    // debugger
    return (
        <GameSubscriber>
            {(state) => {
               // debugger
                return (state.liveGame !== null || !calculations.isEmpty(state.liveGame) ?
                    <View>
                        <Text>DONE</Text>
                        {/* <Text>{JSON.stringify(state.liveGame, undefined, 4)}</Text> */}
                        <Text>Position: </Text>
                        <View>{state.liveGame.actions.map((action, index) => {
                            return <Text key={index}>{action.actionName}: {action.count}  </Text>
                        })}</View>
                        <View>

                        </View>

                        {state.liveGame.actions.map((action, index) => {
                            return (
                                <View key={index}>
                                    <Button style={{ width: 30 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { actions.onActionClick(action); }} />
                                </View>
                            )
                        })}
                        <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onLongPress={() => { setActionInput(true) }} onPress={() => { console.log("pressed") }}></AntDesign.Button>
                    </View>

                    :
                    <View>
                        <Text> not done </Text>
                    </View>
                )

            }}
        </GameSubscriber>
    )
}



