import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, colors } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as calculation from './components/GameCalculations/calculateStats'
import { DisplayStats } from './components/functionalComponents/DisplayStats';
import { Colors, ActivityIndicator, Snackbar } from 'react-native-paper';
import * as Utils from './utils/objectOps'
import * as Calculate from './components/GameCalculations/calculateStats'
import { GameSubscriber, UseGameStore } from './DataStore/GameStore';


export default function HomeScreenNew(props) {
    const [state, actions] = UseGameStore();
    const [loadingData, setLoadingData] = useState(true);

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
                console.log("hey boys we loaded.")
            }
        })
    }, []);

    test = async (cb) => {
        await cb().then(res => { console.log(res) })
    }

    testLogger = (data) => {
        let totalsData = Utils.objToArray(data);
        console.log("DATA: ", totalsData);
        let sum = Calculate.sumAllGameActions(totalsData);
        console.log(sum)
        return sum
    }


    return (
        <GameSubscriber>
            {(state, actions) => (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>

                    
                    <View>
                        {state.calculatedData.loading ?
                            <ActivityIndicator animating={true} color={Colors.purple800} />
                            :
                            <View>
                                {/* <Button title="test press" onPress={() => { console.log("utils test: ", testLogger(state.calculatedData.totals)) }}></Button> */}
                                <Text style={{textAlign: 'center', fontWeight: '500'}}>POKER TRACKER</Text>
                                <DisplayStats></DisplayStats>
                                {/* <StatsBox logTotalsByPosition={logTotalsByPosition} height={290} width={200} /> */}
                                <View>
                                    <Button title="Game" style={{ margin: '10px' }} onPress={() => props.navigation.navigate('Game')} />
                                    <Text>ReRender global state</Text>
                                    <TouchableOpacity onPress={() => { manualReload() }}>
                                        <Text style={{ color: Colors.red400 }}>Press me</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => { actions.load().then(console.log('LOADED DATA:', state.data)) }}>
                                        <Text style={{ color: Colors.red400 }}>Press me</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        }
                    </View>
                </View>
            )
            }
        </GameSubscriber>

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