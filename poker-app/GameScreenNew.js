import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as calculation from './components/statscalculation.js';
import * as storage from './components/storageAPI/AsyncStorageController.js';
import { Tester, TestComponent } from './components/testComponents/Tester';
import { GameSubscriber, UseGameStore } from './DataStore/GameStore'
import { ScrollView } from 'react-native-gesture-handler';
import { GameController } from './components/functionalComponents/GameController';
import { DisplayStats } from './components/functionalComponents/DisplayStats'
import { Switch } from 'react-native-paper';
import GameFAB from './components/functionalComponents/GameFAB'
import { RadioTable } from './components/functionalComponents/RadioTable'

//import StoreLoader from '../components/HOCs/StoreLoader'
// import  Tester  from './components/testComponents/Tester'
// const calculation = require('./components/statscalculation.js')
// const storage = require('./components/AsyncStorageController.js');



export default function GameScreenNew(props) {
    const [state, actions] = UseGameStore();
    const [loading, setLoading] = useState(state.loading);
    const [testOn, setTestOn] = useState(state.testModeOn)


    //NOTE: later I may need to check if I need to define an async function inside, and then call load and run a clean up. 
    // useEffect(() => {
    //     console.log('TEST SCREEN: ', state.data.savedGames)
    //     console.log('LIVE :', state.liveGame)

    // }, [])
    useEffect(() => {
        actions.setCurrentORNewLiveGame();
        console.log("reload dat game")
    }, [])

    manualReload = async () => {
        //setLoadingData(true);
        await actions.load().then(async (res) => {
            await actions.loadTotals().then(res => {
                let response = res;
                //console.log('MANUL LOAD RES:', response);
                //setLoadingData(false);
            })
        })
    }

    const toggleTestMode = () => {

    }

    const goHome = () => {
        props.navigation.navigate("Home");
    }



    //NOTE: CHECK CONDITIONAL TO MAKE SURE DATA IS LOADED BEFORE RENDERING 
    return (
        // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>

        // state.loading ?
        //     <Text>We need to load</Text>
        //     :
        <ScrollView>
            <View style={styles.container}>
                <ScrollView>
                    <Card title='Track your game!'>
                        <ScrollView>
                            <GameController goHome={goHome} reload={manualReload}></GameController>
                            <GameSubscriber>
                                {({ liveGame }, { updatePosition }) => (
                                    <RadioTable liveGame={liveGame} setLivePosition={updatePosition} />
                                )}
                            </GameSubscriber>
                        </ScrollView>

                    </Card>
                    {/* <View>
                                <ScrollView>
                                    <DisplayStats></DisplayStats>
                                </ScrollView>
                            </View> */}
                    {/* <Card title='1st tester showing data'>
                                <Text> Card showing all data </Text>
                                <ScrollView>
                                <TestComponent></TestComponent>
                                </ScrollView>
                            </Card> */}

                    {/* <Tester></Tester> */}
                </ScrollView>
                <GameFAB reload={manualReload} goHome={goHome} />
                <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Card  title='Testing Buttons'>
                        <View style={{justifyContent: 'space-around',  display: 'flex'}}>
                            <Text>Toggle test Buttons</Text><Switch
                                style={{ alignContent: 'center' }}
                                value={state.testModeOn}
                                onValueChange={actions.TestModeSwitch}
                            />


                            {state.testModeOn ?
                                // <ScrollView>
                                <Tester></Tester>
                                // </ScrollView>
                                :
                                <View></View>



                            }
                        </View>
                    </Card>
                </View>
            </View>
        </ScrollView>



    )

}


//TestScreen.contextType = MyContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});