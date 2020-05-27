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

//import StoreLoader from '../components/HOCs/StoreLoader'
// import  Tester  from './components/testComponents/Tester'
// const calculation = require('./components/statscalculation.js')
// const storage = require('./components/AsyncStorageController.js');



export default function GameScreenNew() {
    const [state, actions] = UseGameStore();
    const [loading, setLoading] = useState(state.loading);
    const [testOn, setTestOn] = useState(state.testModeOn)


    //NOTE: later I may need to check if I need to define an async function inside, and then call load and run a clean up. 
    // useEffect(() => {
    //     console.log('TEST SCREEN: ', state.data.savedGames)
    //     console.log('LIVE :', state.liveGame)

    // }, [])
    useEffect(() => {
        console.log("reload dat game")
    }, [])

    manualReload = async () => {
        setLoadingData(true);
        await actions.load().then(async (res) => {
            await actions.loadTotals().then(res => {
                let response = res;
                console.log('MANUL LOAD RES:', response);
                setLoadingData(false);
            })
        })
    }

    const toggleTestMode = () => {

    }
    

    //NOTE: CHECK CONDITIONAL TO MAKE SURE DATA IS LOADED BEFORE RENDERING 
    return (
        // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>

        // state.loading ?
        //     <Text>We need to load</Text>
        //     :

        <View style={styles.container}>
            <ScrollView>
                <Card title='Track your game!'>
                    <Text> Current Game Info: </Text>
                    <ScrollView>
                        <GameController></GameController>
                    </ScrollView>
                </Card>
                {/* <View>
                                <ScrollView>
                                    <DisplayStats></DisplayStats>
                                </ScrollView>
                            </View> */}
                <Card title='Testing Buttons'>
                    <View style={{ justifyContent: 'center' }}>
                        
                        <Text>Toggle test Buttons</Text><Switch
                            style={{alignContent: 'center'}}
                            value={state.testModeOn}
                            onValueChange={actions.TestModeSwitch}
                        />
                    </View>
                    {state.testModeOn ?
                        <ScrollView>
                            <Tester></Tester>
                        </ScrollView>
                        :
                       <View></View>



                    }
                </Card>



                {/* <Card title='1st tester showing data'>
                                <Text> Card showing all data </Text>
                                <ScrollView>
                                <TestComponent></TestComponent>
                                </ScrollView>
                            </Card> */}
            </ScrollView>
            {/* <Tester></Tester> */}
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