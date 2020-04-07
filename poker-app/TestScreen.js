import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { MyContext } from './stateContext/GlobalState'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as calculation from './components/statscalculation.js';
import * as storage from './components/storageAPI/AsyncStorageController.js';
import { Tester, TestComponent } from './components/testComponents/Tester';
import { GameSubscriber, UseGameStore } from './DataStore/GameStore'
import { ScrollView } from 'react-native-gesture-handler';
import { GameController } from './components/functionalComponents/GameController';
import { DisplayStats } from './components/functionalComponents/DisplayStats'

//import StoreLoader from '../components/HOCs/StoreLoader'
// import  Tester  from './components/testComponents/Tester'
// const calculation = require('./components/statscalculation.js')
// const storage = require('./components/AsyncStorageController.js');



export default function TestScreen() {
    const [state, actions] = UseGameStore();
    const [loading, setLoading] = useState(state.loading);


    //NOTE: later I may need to check if I need to define an async function inside, and then call load and run a clean up. 
    useEffect(() => {

        //setLoading(true);
        // actions.load().then(() => {
        //     // console.log("screen state::::", state);
        //     //setLoading(false);
        // }).catch(err => {
        //     alert('error in test load')
        // });
        console.log('TEST SCREEN: ', state.data.savedGames)
        console.log('LIVE :', state.liveGame)
        //loadData();
        // return () => {
        //     cleanup
        // };
    }, [state.liveGame])



    //NOTE: CHECK CONDITIONAL TO MAKE SURE DATA IS LOADED BEFORE RENDERING

    return (
        // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
        <GameSubscriber>
            {(state) => (
                state.loading ?
                    <Text>We need to load</Text>
                    :
                    <View style={styles.container}>
                        <ScrollView>
                            <Card title='Test Controller'>
                                <Text> FOR TESTS! </Text>
                                <ScrollView>
                                    <GameController></GameController>
                                </ScrollView>
                            </Card>
                            <View>
                                <ScrollView>
                                    <DisplayStats></DisplayStats>
                                </ScrollView>
                            </View>
                            <Card title='TestComponent with Subscriber'>
                                <Text> Subscriber test </Text>
                                <ScrollView>
                                    <TestComponent></TestComponent>
                                </ScrollView>
                            </Card>

                            <Card title='1st tester showing data'>
                                <Text> Card showing all data </Text>
                                <ScrollView>
                                    <Tester></Tester>
                                </ScrollView>
                            </Card>
                        </ScrollView>
                        {/* <Tester></Tester> */}
                    </View>
            )}
        </GameSubscriber>
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