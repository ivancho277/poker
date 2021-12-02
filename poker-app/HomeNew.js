import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as calculation from './components/GameCalculations/calculateStats'
import { DisplayStats } from './components/functionalComponents/DisplayStats';
import { Colors, ActivityIndicator, Snackbar, Title, TextInput } from 'react-native-paper';
import * as Utils from './utils/objectOps'
import * as Calculate from './components/GameCalculations/calculateStats'
import { GameSubscriber, UseGameStore } from './DataStore/GameStore';
import { ChipButton } from './components/functionalComponents/ChipButton'
import { isUndefined } from 'underscore';
import { ConfirmDialog } from './components/DialogsAndSnackbars/ConfirmDialog'


export default function HomeScreenNew(props) {
    const [state, actions] = UseGameStore();
    const [loadingData, setLoadingData] = useState(true);
    const [testtext, settesttext] = useState('');
    const [showNoDataConfirm, setShowNoDataConfirm] = useState(false);

    const _hideDialog = () => { setShowNoDataConfirm(false) };

    manualReload = async () => {
        setLoadingData(true);
        await actions.load().then(async (res) => {
            await actions.loadTotals().then(res => {
                let response = res;
                //console.log('MANUL LOAD RES:', response);
                setLoadingData(false);
            })
        })
    }

    useEffect(() => {
        async function dataLoad() {
            return await actions.load().then(async (res) => {
                return await actions.loadTotals().then(res => {
                    setLoadingData(false);
                    return true;
                })
            })
        }
        dataLoad().then(res => {
            if (res) {
                console.log("hey boys we loaded.");
                setShowNoDataConfirm(!state.thereIsSavedData);
            }
        })
    }, [state.thereIsSavedData]);

    test = async (cb) => {
        await cb().then(res => { console.log(res) })
    }

    //REMINDER: FRBRUARY 27th 2021 ---- ----------this is where i finished, I was trying to see if I can just use all the imported functions here in this method and just pop them in an array just to check the output.
    testLogger = (data) => {
        let { totals } = data;
        let totalsData = Utils.objToArray(totals);
        console.log("DATA: ", totalsData);
        let sum = Calculate.sumAllGameActions(totalsData);
        console.log(sum)
        let dataarray = [];
        dataarray.push(sum);

        //let whatDataIsThis = Calculate.sumGamesTotals(totalsData);  //NOTE: here i need to try and have the calculate.findmanygames() function return into this one

        //dataarray.push(whatDataIsThis);

        //dataarray.push(Calculate.sumPositionCount(totalsData));
        //return dataarray;
    }
    //NOTE: ^^^^above function testing to log what my calc funtions are returning and see what input they need
    //NOTE: type error, game.game.data in not an object.
    //TODO: above where the other note is I need to try to do what it says and use the findmanygames() and then use the returned array from that, check if that works 1st.
    //TODO: after that lets check how we can get an array to each actions stats for the display table.



    reviewCalcfunctionsLog = (data) => {


    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <GameSubscriber>
                {(state, actions) => (


                    <View>
                        {state.calculatedData.loading ?
                            <ActivityIndicator animating={true} color={Colors.purple800} />
                            :
                            <View>
                                <Button title="test press" onPress={() => { console.log("utils test: ", testLogger(state.calculatedData)) }}></Button>
                                <View style={{ height: 150, justifyContent: 'center' }}>
                                    <Image source={require('./assets/noun_statsChip.png')} style={{ width: 70, height: 70, resizeMode: 'contain' }} />
                                    <Title style={{ textAlign: 'center', fontWeight: '500' }}>POKER TRACKER</Title>
                                </View>
                                {/* <DisplayStats></DisplayStats> */}
                                {/* <StatsBox logTotalsByPosition={logTotalsByPosition} height={290} width={200} /> */}
                                <View style={{ flex: 1, marginTop: 15, justifyContent: 'space-between' }}>
                                    <Button title="     Begin Tracking A Game!" icon={{ name: 'play-circle-filled', size: 40, color: 'white' }} style={{ margin: '10px' }} onPress={() => props.navigation.navigate('Game')} />
                                    <Button title="     Games Config." icon={{ name: 'settings', size: 40, color: 'white' }} style={{ margin: '10px' }} onPress={() => props.navigation.navigate('Settings')} />
                                    <Button title="     Statistics" icon={{ name: 'pie-chart', size: 40, color: 'white' }} style={{ margin: '10px' }} onPress={() => props.navigation.navigate('Statistics')} />
                                    <Button title=" log test" icon={{ name: 'save', color: 'red', size: 30 }} onPress={() => { console.log('one: %j, %j', (typeof banss === "undefined"), isUndefined(state.MAX_POSITION)) }} />
                                    {/* <TextInput   
                                        label="save a word."
                                        value={testtext}
                                        onChangeText={text => settesttext(text)}

                                    />

                                    <Button title="load from SS from API" icon={{name:'save', color: 'red', size: 30 }} onPress={() => {actions.loadTestFromStorage()}} />
                                    <Button title="Save + Log Secure Storage" icon={{name:'save', color: 'red', size: 30 }} onPress={() => {actions.saveTestValue(testtext); settesttext('')}} /> */}

                                    <Text>ReRender global state</Text>
                                    <TouchableOpacity onPress={() => { manualReload() }}>
                                        <Text style={{ color: Colors.red400 }}>Press me</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity onPress={() => { actions.load().then(console.log('LOADED DATA:', state.data)) }}>
                                        <Text style={{ color: Colors.red400 }}>Press me</Text>
                                    </TouchableOpacity> */}
                                </View>
                                <ConfirmDialog isVisible={showNoDataConfirm} title="Welcome!" message="There is no data currently saved in storage, save your next game to start collecting your Statistics!" hide={_hideDialog} />
                            </View>
                        }
                    </View>
                )
                }
            </GameSubscriber>
        </View>

    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BCD4",
        height: '80%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,

    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});