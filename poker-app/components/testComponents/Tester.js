import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore'
import { StoreLoader } from '../HOCs/StoreLoader'



export const TestComponent = () => {

    return (
        <GameSubscriber>
            {(state) => (
                <View>
                    <Text>Subscriber test</Text>
                    <Text>1. {state.loading.toString()}</Text>
                    <Text>2. {JSON.stringify(state.datadata, undefined, 4)}</Text>
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
    useEffect(() => {
        actions.load();
    }, [])



    return (
        <View>



            {!state.loading ?

                <View>
                    <Text>FROM STORE: {state.loading.toString()}</Text>
                    <Text>STATE: {JSON.stringify(state, undefined, 4)}</Text>
                    <Text>Test sweet state.</Text>
                    <Text />
                    <Button title='test ren' onClick={console.log(state.data)} />
                </View>
                :
                <View>
                    <Text>Loading...</Text>
                </View>
            }





        </View>
    )
}

