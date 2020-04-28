import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import { Text, Card, Paragraph, DataTable, ActivityIndicator, Colors, Subheading } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { Tables } from '../../constants/tables';
import * as Utils from '../../utils/objectOps.js';
import * as Calculate from '../GameCalculations/calculateStats'



export function DisplayStats() {
    const [state, actions] = UseGameStore();
    const [totalActions, setTotalActions] = useState();

    useEffect(() => {
        actions.loadTotals();
    }, [])

    const calculatePercentage = (count, total) => {
        return Math.round(count / total * 100)
    }

    return (
        <GameSubscriber>
            {(state, actions) => (
                <View style={{ width: '100%', height: 350, maxHeight: 400, flex: 1, alignContent: 'center' }}>
                    <Card style={{ padding: 10, margin: 5, alignSelf: 'center' }} elevation={9}  >
                        <Card.Title title="My Stats!" subtitle="Totals" />
                        <ScrollView>
                            <Card.Content>
                                {/* <Paragraph>
                                    <Text>All Saved: {JSON.stringify(state.data.savedGames, undefined, 4)}</Text>
                                </Paragraph> */}
                                {state.loading ?
                                    <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                    :
                                    <View style={{ borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>

                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Action:</DataTable.Title>
                                                <DataTable.Title numeric>Totals</DataTable.Title>
                                                <DataTable.Title numeric>Total %</DataTable.Title>
                                            </DataTable.Header>
                                            {Utils.isEmpty(state.data.savedGames) ? <Subheading >You have no Saved Games</Subheading >
                                                :
                                                Utils.objToArray(state.calculatedData.totals).map((element, i) => {
                                                    console.log("elem: ", element)
                                                    let keysArr = Object.keys(element)
                                                    console.log("KEYSS: ", keysArr)
                                                    let actionKey = keysArr[0];
                                                    console.log("WHAT: ", actionKey)
                                                    return (
                                                        <DataTable.Row key={`${actionKey}_Row_${i}`}>
                                                            <DataTable.Cell key={`${actionKey}_name_${i}`}>{actionKey}</DataTable.Cell>
                                                            <DataTable.Cell key={`${actionKey}_${i}`}>     {element[actionKey]}</DataTable.Cell>
                                                            <DataTable.Cell key={`${actionKey}_key2_${i}`}>   {calculatePercentage(element[actionKey], Calculate.sumAllGameActions(state.calculatedData.totals))}%</DataTable.Cell>
                                                        </DataTable.Row>
                                                    )
                                                })}
                                            <DataTable.Pagination
                                                page={0}
                                                numberOfPages={3}
                                                onPageChange={(page) => { console.log(page); }}
                                                label="1-2 of 6"
                                            />
                                        </DataTable>
                                        {state.calculatedData.loading ?
                                            <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                            :
                                            <Text>All Saved: {JSON.stringify(state.calculatedData, undefined, 4)}</Text>
                                        }
                                    </View>
                                }

                            </Card.Content>
                        </ScrollView>
                    </Card>
                </View>
            )
            }
        </GameSubscriber>



    )
}