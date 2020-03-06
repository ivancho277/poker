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
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'




// const AddAction =  <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onPress={() => { console.log("pressed") }}>
//         Add Action
//     </AntDesign.Button>



// getPosition = (position) => {
//     this.setState({
//         position: position
//     })
//     this.props.setPosition(position);
// }

// shouldPositionIncrement = (cb) => {
//     if (this.state.currentTime.getTime() != this.state.previousTime.getTime()) {
//         cb(this.state.position)
//         //this.saveAllGames();
//         this.CurrentGameSave();
//         this.setState({
//             previousTime: this.state.currentTime
//         })
//     }
// }






export const GameController = (props) => {
    const [{ liveGame, loading }, actions] = UseGameStore();

    // const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [previousTime, setPreviousTime] = useState(new Date());
    // const [actionInputOpen, setActionInput] = useState(false);
    // const [actionToAdd, editActionToAdd] = useState('');
    // const [doneLoading, setDoneLoading] = useState(false);
    // const [position, setPosition] = useState();
    const [liveActions, setLiveActions] = useState();

    useEffect(() => {
        console.log("CONTROLLER STATE: ", liveGame);
        // if (state.liveGame) {
        //     const game = state.liveGame.map(action => { return new Action(action) })
        //     setLiveActions(game);
        //     console.log('liveActions', liveActions)
        // }
        console.log("Time curr", currentTime)
        console.log("Time prev", previousTime)
        console.log('out', liveActions)
    }, [liveGame])
    /**
     * 
     * @param {Function} cb - callback function which will be an increment index of what radio button is pressed in <Radio>
     * - This is necessary due to the Radio component needing to update its index internally, and I am not able to call 
     * any methods form child component <Radio>.
     */
    const shouldPositionIncrement = (cb) => {
        console.log("am i here?")

        if (currentTime.getTime() != previousTime.getTime()) {
            cb(liveGame.position);
            console.log("position fun: ", liveGame.position)
            //this.saveAllGames();
            // actions.saveCurrentGame();
            setPreviousTime(currentTime)
        }
    }
    const getPosition = (position) => {
        //actions.updatePosition(position);

        // this.props.setPosition(position);
    }

    onActionClick = (action, actionIndex) => {
        setCurrentTime(new Date())
        actions.onActionClick(action, actionIndex) //!OnActionClick needs to setPrevious time to CurrentTime
        
      

    }



    // debugger
    return (
        <GameSubscriber>
            {({ liveGame, loading }, { shouldPositionIncrement }) => (
                //debugger
                (liveGame !== null || !calculations.isEmpty(liveGame)) ?
                    <View>
                        <View>
                            <Text>DONE</Text>
                            {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                            <Text>Position: {liveGame.position} </Text>
                            <View>{liveGame.actions.map((action, index) => {
                                return <Text key={index}>{action.actionName}: {action.count}  </Text>
                            })}</View>
                            <View>

                            </View>

                            {liveGame.actions.map((action, index) => {
                                return (
                                    <View key={index}>
                                        <Button style={{ width: 30 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { onActionClick(action, index);  }} />
                                    </View>
                                )
                            })}
                            <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onLongPress={() => { setActionInput(true) }} onPress={() => { console.log("pressed") }}></AntDesign.Button>
                        </View>
                        <View>
                            <Radio position={liveGame.position} getPosition={getPosition} shouldPositionIncrement={shouldPositionIncrement} />
                        </View>
                    </View>
                    :
                    <View>
                        <Text> not done </Text>
                    </View>
                // <View><Text>Things will happen</Text></View>

            )}
        </GameSubscriber>
    )
}



