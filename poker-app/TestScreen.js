import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { MyContext } from './stateContext/GlobalState'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import * as calculation from './components/statscalculation.js';
import * as storage from './components/AsyncStorageController.js';
import { Tester, TestComponent } from './components/testComponents/Tester';
import { GameSubscriber } from './DataStore/store'
import { ScrollView } from 'react-native-gesture-handler';
import { GameController } from './components/functionalComponents/GameController'
//import StoreLoader from '../components/HOCs/StoreLoader'
// import  Tester  from './components/testComponents/Tester'
// const calculation = require('./components/statscalculation.js')
// const storage = require('./components/AsyncStorageController.js');








export default function TestScreen() {


        return (
            // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            <GameSubscriber>
                {(state, actions) => (
                    <View style={styles.container}>
                        <ScrollView>
                            <Card title='Test Screem'>
                                <Text> FOR TESTS! </Text>
                                <ScrollView>
                                    <GameController></GameController>
                                </ScrollView>
                            </Card>

                            <Card title='Controll me plz'>
                                <Text> Subscriber test </Text>
                                <ScrollView>
                                    <TestComponent></TestComponent>
                                </ScrollView>
                            </Card>

                            <Card title='Controll me plz'>
                                <Text> Test controller </Text>
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


TestScreen.contextType = MyContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});