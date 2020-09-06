import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import * as Calculate from './components/GameCalculations/calculateStats.js';
import { Tester, TestComponent } from './components/testComponents/Tester';
import { GameSubscriber, UseGameStore } from './DataStore/GameStore'
import { ScrollView } from 'react-native-gesture-handler';
import { GameController } from './components/functionalComponents/GameController';
import { DisplayStats } from './components/functionalComponents/DisplayStats'
import { Switch, Card, Button } from 'react-native-paper';
import GameFAB from './components/functionalComponents/GameFAB';
import { RadioTable } from './components/functionalComponents/RadioTable';
import { LoadCurrentDialog } from './components/functionalComponents/LoadCurrentDialog';
import { LiveGameDisplayTable } from './components/functionalComponents/dataDisplays/Data Table Displays/LiveGameDisplayTable';
import { GameDataListItem } from './components/functionalComponents/dataDisplays/List Displays/GameDataListItem.js';


export default function GameScreenNew(props) {
    const [state, actions] = UseGameStore();
    const [loading, setLoading] = useState(state.loading);
    const [testOn, setTestOn] = useState(state.testModeOn);
    const [isAskLoadVisible, setIsAskLoadVisible] = useState(false);
    const [foundGames, setFoundGames] = useState([]);

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
        if (state.data.currentGame && state.allGamesArray) {
            _showLoadDialog()
        }

        // if (state.liveGame !== null && state.liveGame.tags.length !== foundGames.length) {
        //     let newfoundgames = searchAndUpdateFoundGames(state.liveGame.tags, state.allGamesArray, Calculate.searchByManyTags);
        //     if (newfoundGames) {

        //         setFoundGames([...newfoundgames]);
        //         console.log("NEWFOUNDLAND", newfoundgames);
        //     }
        // }

       // console.log('state.currentGame: %o', state.data.currentGame);

    }, [])

    const searchAndUpdateFoundGames = (tags, allGames, _cb_Search) => {
        if (typeof _cb_Search === 'function') {
            return _cb_Search(tags, allGames);
        }
        return [];
    }


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


    return (
        // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
        // state.loading ?
        //     <Text>We need to load</Text>
        //     :
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <ScrollView>
                        <Card style={{ backgroundColor: '#7FB7BE' }}>
                            <Card.Title style={{ alignItems: 'center' }} title="      Track your game!" />
                            {isAskLoadVisible ? <View></View> :
                                (state.liveGame !== null && !state.data.liveGameLoading) ? <LiveGameDisplayTable /> :
                                    <View>
                                        <Text>Start to play</Text>
                                    </View>}
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
                            <Card.Title title='     Testing Buttons' />
                            <Card.Content>
                                <View style={{ flex: 1, alignItems: 'flex-start', marginTop: 10 }}>
                                    <Text> Toggle test Buttons</Text>
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