import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { UseGameStore, GameContainer, GameSubscriber } from '../../DataStore/GameStore'


const Tester = () => {

    const [state, actions] = UseGameStore();
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        actions.load();

    }, [])



    return (
        <View>

        
               
                {state.loading ?

                    <Text>Loading...</Text>

                    :

                    <View>
                        <Text>FROM STORE: {state.loading.toString()}</Text>
                        <Text>STATE: {JSON.stringify(state.data)}</Text>
                        <Text>Test sweet state.</Text>
                        <Text />
                        <Button title='test ren' onClick={console.log(state.data) } />
                    </View>
        
                }
            




        </View>
    )
}

export default Tester
