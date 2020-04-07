import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, onLongPress } from 'react-native';
import Radio from '../Radio.js';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as calculations from '../statscalculation.js';
import { StorageAPI } from '../storageAPI/AsyncStorageController'
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
    const [test, setTest] = useState();

    // useEffect(() => {
    //     console.log("Time curr", currentTime)
    //     console.log("Time prev", previousTime)
    //     console.log("liveGame:  ", liveGame);
    // }, [])


    onActionClick = (action, actionIndex) => {
        // setCurrentTime(new Date())
        actions.onActionClick(action, actionIndex) //!OnActionClick needs to setPrevious time to CurrentTime
    }

    GetDataTest = async () => {
        const myData = await StorageAPI.getAllNewGames();
        setTest(JSON.parse(myData));
        setTimeout(() => {
            console.log("new :::", JSON.parse(myData));
            if (typeof(JSON.parse(myData)) === "Array") {
                console.log("length::: ", JSON.parse(myData).length);
            }
        }, 0);
        return (JSON.parse(myData));
    }

    // debugger
    return (
        <GameSubscriber>
            {({ liveGame, loading, data }, { updatePosition, incrementPosition, addNewAction, saveAllGames, getGames, resetLiveGame }) => (
                //debugger
                (liveGame !== null || !calculations.isEmpty(liveGame)) ?
                    <View>
                        <View>
                            <Text>DONE</Text>
                            {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                            <Text>Position: {liveGame.position} </Text>
                            <View><Text>Current Tags: <Text style={{ fontWeight: 'bold' }}> {liveGame.tags.join(', ')}</Text> </Text></View>
                            <View>{liveGame.actions.map((action, index) => {
                                return <Text key={index}>{action.actionName}: {action.count}  </Text>
                            })}</View>
                            <View>

                            </View>
                            <View style={{ borderWidth: 1, borderStyle: 'solid', margin: 5, padding: 5, borderColor: 'black', display: "flex", flexDirection: 'row', zIndex: -1, justifyContent: 'space-evenly', alignItems: 'flex-start', alignItems: 'center', flexWrap: 'wrap', height: 'auto', width: '90%' }}>
                                {liveGame.actions.map((action, index) => {
                                    return (
                                        <View key={index}>
                                            <Button containerStyle={{ padding: 3 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { onActionClick(action, index); }} />
                                        </View>
                                    )
                                })}
                            </View>
                            <AntDesign.Button name="save" backgroundColor="purple" onPress={() => { saveAllGames(); resetLiveGame(); }}>Save Game</AntDesign.Button>

                            <AntDesign.Button name={showActionInput ? "minuscircleo" : "pluscircleo"} backgroundColor="#3b5998" onPress={() => { setShowActionInput(!showActionInput) }}>{showActionInput ? "Minimize" : "Add Action"}</AntDesign.Button>
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
                                <View></View>
                            }
                            <AddTag allTags={data.allTags}></AddTag>
                            <AntDesign.Button name={'tool'} backgroundColor="red" onPress={() => { console.log(GetDataTest()) }}>{"Console Log new Storage"}</AntDesign.Button>
                            <AntDesign.Button name={'delete'} backgroundColor="red" onPress={() => { StorageAPI.deleteAllNewGames() }}><Text>Clear new Storage</Text></AntDesign.Button>
                        </View>
                        <View style={{ marginTop: 5 }}>
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



