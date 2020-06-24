import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore';
import { Card } from 'react-native-paper';
import { StoreLoader } from '../HOCs/StoreLoader';
import { ScrollView } from 'react-native-gesture-handler';
import { StorageAPI as Storage } from '../storageAPI/AsyncStorageController';
import { Colors, ActivityIndicator, Switch } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { StorageAPI } from '../storageAPI/AsyncStorageController'
import { ConfirmDialog } from '../functionalComponents/ConfirmDialog';
import { GameDataAccordian } from '../functionalComponents/dataDisplays/List Displays/GameDataAccordian'

export const TestComponent = () => {

    return (
        <GameSubscriber>
            {(state) => (
                <View>
                    <Text>Subscriber testachka</Text>
                    <Text>1. {state.loading.toString()}</Text>
                    <Card>
                        <ScrollView>
                            <Card.Title title="New Saved Data:" />
                            <Card.Content>
                                <Text>YA! {JSON.stringify(state.data.savedGames, undefined, 4)}</Text>
                            </Card.Content>
                        </ScrollView>
                    </Card>
                    <Text>2. {JSON.stringify(state.data, undefined, 4)}</Text>
                    {!state.liveGame === Object ? <Text>not loaded</Text> : <Text>3. {JSON.stringify(state.liveGame, undefined, 4)}</Text>}
                </View>
            )}
        </GameSubscriber>
    )
}

const innerComponent = () => {

}

export const Tester = () => {

    const [state, actions] = UseGameStore();
    const [isVisible, setIsVisible] = useState(false);
    const [showTestDialog, setShowTestDialog] = useState(false);
    const _showDialog = () => { setIsVisible(true) };
    const _hideDialog = () => { setIsVisible(false) };
    // const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     //actions.load();
    // }, [])

    const GetDataTest = async () => {
        const myData = await StorageAPI.getAllNewGames();
        // setTest(JSON.parse(myData));
        setTimeout(() => {
            console.log("new :::", JSON.parse(myData));
            if (typeof (JSON.parse(myData)) === "Array") {
                console.log("length::: ", JSON.parse(myData).length);
            }
        }, 0);
        return (JSON.parse(myData));
    }

    const getCurrentGame = async () => {
        const CurrGame = await StorageAPI.retrieveCurrentGame();
        setTimeout(() => {
            console.log("What Saved LIVEGAME:::", JSON.parse(CurrGame));
        }, 0);
        return JSON.parse(CurrGame);
    }

    const manualReload = async () => {
        //setLoadingData(true);
        await actions.load().then(async (res) => {
            await actions.loadTotals().then(res => {
                let response = res;
                console.log('MANUL LOAD RES:', response);
                //setLoadingData(false);
            })
        })
    }


    /**
     * Todo: need to make an action that returns the totals array in actions
     */
    return (
        <GameSubscriber>
            {(state, actions) => (
                <View>
                    {/* {!state.calculatedData.loading ? */}

                    <View>
                        <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}> Switch to show Testing buttons </Text>
                        <GameDataAccordian />
                        <Button color={Colors.deepOrange400} title="check live Totals" onPress={() => { console.log("liveGame.totals: ", actions.getGameTotals()) }}> </Button>
                        <Button color={Colors.deepOrange400} title="check live actions" onPress={() => { console.log("liveGame.actions: ", state.liveGame.actions) }}> </Button>
                        <Button color={Colors.teal400} title="test update totals" onPress={() => { console.log(Storage.updateTotals(state.liveGame)) }}></Button>
                        <Button title="get storage totals" onPress={() => {
                            setTimeout(async () => {
                                let theData = await Storage.getTotals();
                                let moreDataPOS = await Storage.getTotalsByPosition();
                                setTimeout(() => {
                                    console.log(JSON.parse(theData))
                                    console.log(JSON.parse(moreDataPOS))
                                }, 0);
                                console.log(JSON.parse(theData))
                            }, 0);
                        }}></Button>
                        <Button title="log Data" onPress={() => { console.log("DATA:::", state.data) }}></Button>
                        <Button title="log Calculated Data" onPress={() => { console.log("DATA:::", state.calculatedData) }}></Button>
                        <Button title="log currentGame (from Storage)" onPress={() => { getCurrentGame(); }}></Button>
                        <AntDesign.Button name={'delete'} backgroundColor="red" onPress={() => { actions.removeCurrentGameFromStorage() }}><Text>Remove CurrentGame from Storage</Text></AntDesign.Button>
                        <AntDesign.Button name={'tool'} backgroundColor="red" onPress={() => { console.log(GetDataTest()) }}>{"Console Log new Storage"}</AntDesign.Button>
                        <AntDesign.Button name={'delete'} backgroundColor="red" onPress={() => { _showDialog(); StorageAPI.deleteAllNewGames() }}><Text>Clear new Storage</Text></AntDesign.Button>
                        <AntDesign.Button name={'reload1'} backgroundColor="red" onPress={() => { actions.resetLiveGame(); manualReload(); }}><Text>Reset Live Game</Text></AntDesign.Button>

                        <ConfirmDialog title="Warning" message="Deleting games alone is just for testing, Running totals will not be removed and calculations will be incorect. Please Reset Data in settings to fix." isVisible={isVisible} show={_showDialog} hide={_hideDialog} />
                    </View>
                    {/* :
                <View>
                    <Text>Loading...</Text>
                </View> */}


                </View>
            )}
        </GameSubscriber>
    )
}

