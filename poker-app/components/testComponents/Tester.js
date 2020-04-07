import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore';
import { Card } from 'react-native-paper';
import { StoreLoader } from '../HOCs/StoreLoader';
import { ScrollView } from 'react-native-gesture-handler';
import {StorageAPI as Storage} from '../storageAPI/AsyncStorageController';


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
                    <Button title="test press" onPress={() => {console.log(Storage.setInitialTotals(state.data.actions))}}>Press to test</Button>
                    <Button title="check live Totals" onPress={() => {console.log("liveGame.totals")}} />
                </View>
                :
                <View>
                    <Text>Loading...</Text>
                </View>
            }





        </View>
    )
}

