import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import * as calculation from './components/statscalculation.js';
import * as storage from './components/storageAPI/AsyncStorageController.js';
import { Tester, TestComponent } from './components/testComponents/Tester';
import { GameSubscriber, UseGameStore } from './DataStore/GameStore'
import { ScrollView } from 'react-native-gesture-handler';
import { GameController } from './components/functionalComponents/GameController';
import { DisplayStats } from './components/functionalComponents/DisplayStats'
import { Switch, Card, Button } from 'react-native-paper';
import GameFAB from './components/functionalComponents/GameFAB';
import { RadioTable } from './components/functionalComponents/RadioTable';
import { LoadCurrentDialog } from './components/functionalComponents/LoadCurrentDialog';
import { StackedBarChart } from 'react-native-chart-kit'

//import StoreLoader from '../components/HOCs/StoreLoader'
// import  Tester  from './components/testComponents/Tester'
// const calculation = require('./components/statscalculation.js')
// const storage = require('./components/AsyncStorageController.js');



export default function GameScreenNew(props) {
    const [state, actions] = UseGameStore();
    const [loading, setLoading] = useState(state.loading);
    const [testOn, setTestOn] = useState(state.testModeOn);
    const [isAskLoadVisible, setIsAskLoadVisible] = useState(false);

    const _showLoadDialog = () => { setIsAskLoadVisible(true) }
    const _hideLoadDialog = () => { setIsAskLoadVisible(false) }
    const _startNewGame = () => { actions.resetLiveGame(); manualReload() }
    const _continueCurrentGame = () => { console.log("continue"); }




    //NOTE: later I may need to check if I need to define an async function inside, and then call load and run a clean up. 
    // useEffect(() => {
    //     console.log('TEST SCREEN: ', state.data.savedGames)
    //     console.log('LIVE :', state.liveGame)

    // }, [])
    //TODO: 6/22/2020 we need to also make sure that there are saved games in general before showing dialog!
    useEffect(() => {
        actions.setCurrentORNewLiveGame();
        if (state.data.currentGame) {
            _showLoadDialog()
        }
        console.log('state.currentGame: %o', state.data.currentGame);

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



    //TODO: Fix position of Fab.
    //TODO: fix position of switch
    return (
        // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>

        // state.loading ?
        //     <Text>We need to load</Text>
        //     :
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <ScrollView>
                        <Card>
                            <Card.Title title="Track your game!" />
                            <Card.Content>
                                <ScrollView>
                                    <GameController goHome={goHome} reload={manualReload}></GameController>
                                    <GameSubscriber>
                                        {({ liveGame }, { updatePosition }) => (
                                            <RadioTable liveGame={liveGame} setLivePosition={updatePosition} />
                                        )}
                                    </GameSubscriber>
                                </ScrollView>
                                <LoadCurrentDialog
                                    isVisible={isAskLoadVisible}
                                    title="Do you want to Load last Game?"
                                    message={'You have an unfinished previous Game, do you want to continue playing or start new game? '}
                                    hide={_hideLoadDialog}
                                    confirmFunction={_continueCurrentGame}
                                    confirmText="Load Game"
                                    declineFunction={_startNewGame}
                                    declineText="Start New Game"
                                />
                            </Card.Content>
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
                    <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                        <Card>
                            <Card.Title title='Testing Buttons' />
                            <Card.Content>
                                <View style={{ flex: 1, alignItems: 'flex-start', marginTop: 10 }}>
                                    <Text>Toggle test Buttons</Text>
                                    <Switch
                                        style={{ marginTop: 10 }}
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
                            </Card.Content>
                        </Card>
                    </View>
                </View>
            </ScrollView>
            <GameFAB reload={manualReload} goHome={goHome} />
        </View>


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