import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, onLongPress } from 'react-native';
import Radio from '../Radio.js';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as calculations from '../statscalculation.js';
import { AddTag } from './AddTag'
// const storageController = require('./AsyncStorageController.js')
// const calculations = require('./statscalculation.js')
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'




// const AddAction =  <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onPress={() => { console.log("pressed") }}>
//         Add Action
//     </AntDesign.Button>


export const GameController = (props) => {
    const [{ liveGame, loading, currentTime, previousTime }, actions] = UseGameStore();
    const [showActionInput, setShowActionInput] = useState(false);
    const [action, setAction] = useState('')
    // const [loading, setLoading] = useState(true);
    // const [actionInputOpen, setActionInput] = useState(false);
    // const [actionToAdd, editActionToAdd] = useState('');
    // const [doneLoading, setDoneLoading] = useState(false);
    const [liveActions, setLiveActions] = useState();

    useEffect(() => {

        console.log("Time curr", currentTime)
        console.log("Time prev", previousTime)
        console.log("liveGame:  ", liveGame);
    }, [liveGame,])


    onActionClick = (action, actionIndex) => {
        // setCurrentTime(new Date())
        actions.onActionClick(action, actionIndex) //!OnActionClick needs to setPrevious time to CurrentTime
    }

    // debugger
    return (
        <GameSubscriber>
            {({ liveGame, loading, data }, { updatePosition, incrementPosition, addNewAction}) => (
                //debugger
                (liveGame !== null || !calculations.isEmpty(liveGame)) ?
                    <View>
                        <View>
                            <Text>DONE</Text>
                            {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                            <Text>Position: {liveGame.position} </Text>
                            <View></View>
                            <View>{liveGame.actions.map((action, index) => {
                                return <Text key={index}>{action.actionName}: {action.count}  </Text>
                            })}</View>
                            <View>

                            </View>

                            {liveGame.actions.map((action, index) => {
                                return (
                                    <View key={index}>
                                        <Button style={{ width: 30 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { onActionClick(action, index); }} />
                                    </View>
                                )
                            })}
                            <AntDesign.Button name="save" backgroundColor="purple" onPress={() => { console.log("Should save here") }}>Save Game</AntDesign.Button>

                            <AntDesign.Button name={showActionInput ? "minuscircleo" : "pluscircleo"} backgroundColor="#3b5998" onPress={() => { setShowActionInput(!showActionInput) }}>Add Action</AntDesign.Button>
                            {showActionInput ?
                                <View>
                                    <TextInput
                                        style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                                        placeholder={"add an action..."}
                                        onChangeText={(action) => { setAction(action) }}
                                        value={action}
                                    />
                                    {/* <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.clearTags(); this.saveToAllTags() }} /> */}
                                    <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save action" onPress={() => { addNewAction(action); setAction('') }} />
                                </View>
                                :
                                <View><Text>{'\n'}</Text></View>
                            }
                            <AddTag allTags={data.allTags}></AddTag>
                        </View>
                        <View>
                            <Radio position={liveGame.position} setPosition={updatePosition} />
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



