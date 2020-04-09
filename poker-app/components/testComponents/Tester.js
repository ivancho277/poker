import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore';
import { Card } from 'react-native-paper';
import { StoreLoader } from '../HOCs/StoreLoader';
import { ScrollView } from 'react-native-gesture-handler';
import { StorageAPI as Storage } from '../storageAPI/AsyncStorageController';
import { Colors, ActivityIndicator } from 'react-native-paper';


export const TestComponent = () => {

    return (
        <GameSubscriber>
            {(state) => (
                <View>
                    <Text>Subscriber test</Text>
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
    // const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     //actions.load();
    // }, [])



    /**
     * Todo: need to make an action that returns the totals array in actions
     */
    return (
        <View>
            {!state.loading ?

                <View>
                    <Text>Test new CRUD operations for running totals</Text>
                    <Button color={Colors.purpleA100} title="init storage totals" onPress={() => { console.log(Storage.setInitialTotals(state.data.actions)) }}>Press to test</Button>
                    <Button color={Colors.deepOrange400} title="check live Totals" onPress={() => { console.log("liveGame.totals: ", actions.getGameTotals()) }}> </Button>
                    <Button color={Colors.deepOrange400} title="check live actions" onPress={() => { console.log("liveGame.actions: ", state.liveGame.actions) }}> </Button>
                    <Button color={Colors.teal400} title="test update totals" onPress={() => { console.log(Storage.updateTotals(state.liveGame)) }}></Button>
                    <Button title="get storage totals" onPress={() => {
                        setTimeout( async () => {
                            let theData = await Storage.getTotals();
                            let moreDataPOS = await Storage.getTotalsByPosition();
                            setTimeout(() => {
                                console.log(JSON.parse(theData))    
                                console.log(JSON.parse(moreDataPOS))
                            }, 0);
                            console.log(JSON.parse(theData))
                        }, 0);
                    }}>Press to test</Button>
                </View>
                :
                <View>
                    <Text>Loading...</Text>
                </View>
            }





        </View>
    )
}

