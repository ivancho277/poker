import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import { Text, Card, Paragraph, Divider, DataTable, Surface, Title, ActivityIndicator, Colors, Subheading } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { Tables } from '../../constants/tables';
import * as Utils from '../../utils/objectOps.js';
import * as Calculate from '../GameCalculations/calculateStats'



export function DisplayStats(props) {
    const [state, actions] = UseGameStore();
    const [totalActions, setTotalActions] = useState();

    useEffect(() => {
        //actions.loadTotals();
    }, [])

    const calculatePercentage = (count, total) => {
        return Math.round(count / total * 100);
    }

    return (
        <GameSubscriber>
            {(state, actions) => (
                
                    <Surface style={styles.surface}>

                        <Title>Overall Totals</Title>
                        <Divider />
                        <ScrollView>

                            {/* <Paragraph>
                                    <Text>All Saved: {JSON.stringify(state.data.savedGames, undefined, 4)}</Text>
                                </Paragraph> */}
                            {state.calculatedData.loading ?
                                <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                :
                                <Surface style={{ elevation: 7,}}>

                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title>Action:</DataTable.Title>
                                            <DataTable.Title numeric>Totals</DataTable.Title>
                                            <DataTable.Title numeric>Total %</DataTable.Title>
                                        </DataTable.Header>
                                        {Utils.isEmpty(state.data.savedGames) ? <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                            // <Subheading >You have no Saved Games</Subheading >
                                            :
                                            Utils.objToArray(state.calculatedData.totals).map((element, i) => {
                                                // console.log("elem: ", element)
                                                let keysArr = Object.keys(element)
                                                // console.log("KEYSS: ", keysArr)
                                                let actionKey = keysArr[0];
                                                // console.log("WHAT: ", actionKey)
                                                return (
                                                    <DataTable.Row key={`${actionKey}_Row_${i}`}>
                                                        <DataTable.Cell key={`${actionKey}_name_${i}`}>{actionKey}</DataTable.Cell>
                                                        <DataTable.Cell key={`${actionKey}_${i}`}>     {element[actionKey]}</DataTable.Cell>
                                                        <DataTable.Cell key={`${actionKey}_key2_${i}`}>   {calculatePercentage(element[actionKey], Calculate.sumAllGameActions(state.calculatedData.totals))}%</DataTable.Cell>
                                                    </DataTable.Row>
                                                )
                                            })}
                                    </DataTable>
                                    {state.calculatedData.loading ?
                                        <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                        :
                                        <View>
                                            <Text> All Game Data </Text>
                                            {/* <Text>All Saved: {JSON.stringify(state.calculatedData, undefined, 4)}</Text> */}
                                        </View>
                                    }
                                </Surface>
                            }
                        </ScrollView>
                    </Surface>
            )
            }
        </GameSubscriber>
    )
}
// width: 400, display: 'flex', padding: 10, margin: 5, alignSelf: 'center' 

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        padding: 8,
        elevation: 6,
        margin: 10
    },
});