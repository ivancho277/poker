import React, { Component, useContext, useEffect, useState } from 'react';
import { View, TextInput, onLongPress, StyleSheet } from 'react-native';
import Radio from '../Radio.js';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as calculations from '../statscalculation.js';
import { StorageAPI } from '../storageAPI/AsyncStorageController'
import { AddTag } from './AddTag'
// const storageController = require('./AsyncStorageController.js')
// const calculations = require('./statscalculation.js')
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import * as Calculate from '../GameCalculations/calculateStats.js'
import * as Utils from '../../utils/objectOps.js';
import { ActivityIndicator, Colors, Surface, Text, Subheading } from 'react-native-paper';
import TagDialog from './TagDialog';
import { Tables } from '../../constants/tables.js';
import { getPercentages } from '../statscalculation.js';



// const AddAction =  <AntDesign.Button name="pluscircleo" backgroundColor="#3b5998" onPress={() => { console.log("pressed") }}>
//         Add Action
//     </AntDesign.Button>


export const GameController = (props) => {
    const [{ data, liveGame, liveGameLoading, calculatedData }, actions] = UseGameStore();
    const [showActionInput, setShowActionInput] = useState(false);
    const [action, setAction] = useState('');
    const [currentTags, setCurrentTags] = useState([]);
    const [currentTotalSum, setCurrentTotalSum] = useState(0);
    // const [loading, setLoading] = useState(true);
    // const [actionInputOpen, setActionInput] = useState(false);
    // const [actionToAdd, editActionToAdd] = useState('');
    // const [doneLoading, setDoneLoading] = useState(false);
    const [liveActions, setLiveActions] = useState();
    const [test, setTest] = useState();

    useEffect(() => {
        // console.log("Time curr", currentTime)
        // console.log("Time prev", previousTime)
        //actions.gameStart();
        console.log("liveGame:  ", liveGame);
    }, [])

    addActionValues = (actions) => {
        let accum = 0;
        return actions.reduce((accum, action) => {
            return accum + action.count;
        }, accum);
    }


    onActionClick = (action, actionIndex) => {
        // setCurrentTime(new Date())
        actions.onActionClick(action, actionIndex);
    }

    GetDataTest = async () => {
        const myData = await StorageAPI.getAllNewGames();
        setTest(JSON.parse(myData));
        setTimeout(() => {
            console.log("new :::", JSON.parse(myData));
            if (typeof (JSON.parse(myData)) === "Array") {
                console.log("length::: ", JSON.parse(myData).length);
            }
        }, 0);
        return (JSON.parse(myData));
    }

    const getPercentagesForPositionsDisplay = (position) => {
        let dataArray = Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount);
        return  Object.entries(dataArray[position]);
    }

    const calculatePercentage = (count, total) => {
        return Math.round(count / total * 100)
    }

    /**
     * !!Ended Here
     * TODO: 6/13/2020 this seems to work as is now
     * 
     * 
     */
    //TODO: 6/15/2020 this still is having issues. we need to have is show no found games when none, unless it is start. Then show vs all games
    const renderBasicLiveData = (liveGame, allgames) => {
        //!!This means we have no games in storage.
        let storageIsEmpty = false;
        //console.log('ALL GAMES:', allgames)
        //console.log('Checkit::::::', (allgames instanceof Array))
        if (!(allgames instanceof Array)) {
            if (Utils.isEmpty(allgames)) {
                allgames = [];
            }
            if (addActionValues(liveGame.actions) === 0) {
                storageIsEmpty = true;
            }
        }
        //console.log("ITS RAINING TAGS: ", allgames);
        //console.log("ITS RAINING LIVE TAGS: ", liveGame.tags);
        let foundGames = liveGame.tags.length > 0 ? Calculate.searchByManyTags(liveGame.tags, allgames) : allgames;
        console.log("WHERE HAVE ALL THE GOOD TAGS GONE, AND WHERE ARE ALL THE GODS!!: ", foundGames);
        let foundsum = foundGames === null ? Calculate.sumGamesTotals(allgames) : Calculate.sumGamesTotals(foundGames);
        foundsum = foundsum + addActionValues(liveGame.actions)
        //console.log("WHERE'S THE STREETWISE HERCULES, TO BEAT THE RISING ODDS!!: ", foundsum);

        return (<Surface style={styles.surface}>
            <Text style={{ fontStyle: 'italic' }}>Position: {Tables.positionsObject[liveGame.position]} </Text>
            <Text style={{ color: 'red' }}>Note: if no tags selected, % will be out of all games</Text>
            <View><Text>Current Tags: <Text style={{ fontWeight: 'bold' }}> {liveGame.tags.join(', ')}</Text> </Text></View>
            <View style={{ flexDirection: 'row' }}>


                <View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 4, margin: 4, }}>
                    <Subheading style={{ textDecorationLine: 'underline' }}>% for this game</Subheading>
                    {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                    {addActionValues(liveGame.actions) == 0 ? <Text style={{ color: 'green' }}>Start Playing</Text>
                        :
                        <View>{liveGame.actions.map((action, index) => {
                            return <Text key={index}>{action.actionName}: {calculatePercentage(action.count, addActionValues(liveGame.actions))} %  </Text>
                        })}</View>
                    }
                </View>
                <View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 4, margin: 4 }}>
                    <Subheading style={{ textDecorationLine: 'underline' }}>% for Same Tag</Subheading>
                    {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                    {storageIsEmpty ? <Text>No Saved games</Text>
                        :
                        <View>{liveGame.actions.map((action, index) => {
                            return <Text key={index}>{action.actionName}: {calculatePercentage(action.count, foundsum)}%  </Text>
                        })}</View>}
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>


                <View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 4, margin: 4, }}>
                    <Subheading style={{ textDecorationLine: 'underline' }}>Current Position: <Text style={{color: 'blue', fontWeight: 'bold'}}> {liveGame.position} </Text> </Subheading>
                    {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                    
                        <View style={{maxHeight: 80}}>
                            {/* <Button title="press" onPress={() => { console.log(getPercentagesForPositionsDisplay(liveGame.position) ) }}>press</Button>    */}
                            {getPercentagesForPositionsDisplay(liveGame.position).map(action => {
                                return  (<Text>{`${action[0]}: ${Object.values(action[1])}%`} </Text> )
                            })   }
                         </View>
                    
                </View>
                <View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 1, padding: 4, margin: 4 }}>
                    <Subheading style={{ textDecorationLine: 'underline' }}>% for Same Tag</Subheading>
                    {/* <Text>{JSON.stringify(liveGame, undefined, 4)}</Text> */}
                    {storageIsEmpty ? <Text>No Saved games</Text>
                        :
                        <View>{liveGame.actions.map((action, index) => {
                            return <Text key={index}>{action.actionName}: {calculatePercentage(action.count, foundsum)}%  </Text>
                        })}</View>}
                </View>
            </View>

        </Surface>
        )
    }


    // debugger
    return (
        <GameSubscriber>
            {({ liveGame, liveGameLoading, data, allGamesArray }, { updatePosition, incrementPosition, addNewAction, saveAllGames, getGames, resetLiveGame, endLiveLoading }) => (
                //debugger
                (liveGame !== null && !data.liveGameLoading) ?
                    <View>
                        {renderBasicLiveData(liveGame, allGamesArray)}
                        <View style={{ borderWidth: 1, borderStyle: 'solid', margin: 5, padding: 5, borderColor: 'black', display: "flex", flexDirection: 'row', zIndex: -1, justifyContent: 'space-evenly', alignItems: 'flex-start', alignItems: 'center', flexWrap: 'wrap', height: 'auto', width: '90%' }}>
                            {liveGame.actions.map((action, index) => {
                                return (
                                    <View key={index}>
                                        <Button containerStyle={{ padding: 3 }} key={action.actionName} title={`${action.actionName}`} onPress={() => { onActionClick(action, index); }} />
                                    </View>
                                )
                            })}
                        </View>
                        <AntDesign.Button name="save" backgroundColor="purple" onPress={() => { saveAllGames(); resetLiveGame(); props.reload().then(() => { props.goHome() }) }}>Save Game</AntDesign.Button>

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
                        {/* <AddTag allTags={data.allTags}></AddTag> */}
                        <TagDialog></TagDialog>
                        <View style={{ marginTop: 5 }}>
                        </View>
                        {/* <AntDesign.Button name={'tool'} backgroundColor="red" onPress={() => { console.log("my current sum:", addActionValues(liveGame.actions)) }}>{"Console Log sum"}</AntDesign.Button> */}
                        <AntDesign.Button name={'reload1'} backgroundColor="red" onPress={() => { actions.resetLiveGame(); props.reload(); }}><Text>Reset Live Game</Text></AntDesign.Button>
                        {/* <AntDesign.Button name={'tool'} backgroundColor="red" onPress={() => { console.log(GetDataTest()) }}>{"Console Log new Storage"}</AntDesign.Button>
                            <AntDesign.Button name={'delete'} backgroundColor="red" onPress={() => { StorageAPI.deleteAllNewGames() }}><Text>Clear new Storage</Text></AntDesign.Button> */}
                    </View>


                    :
                    <View>
                        <Text> not done </Text>
                    </View>
                // <View><Text>Things will happen</Text></View>

            )}
        </GameSubscriber >
    )
}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        margin: 8,
        height: 'auto',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        display: 'flex'

    },
});


