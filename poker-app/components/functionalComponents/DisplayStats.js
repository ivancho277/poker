import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import { Text, Card, Paragraph, DataTable, ActivityIndicator, Colors } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';




export function DisplayStats() {
    const [state, actions] = UseGameStore();

    useEffect(() => {
        actions.loadTotals();
    }, [])


    return (
        <GameSubscriber>
            {(state, actions) => (
                <View>
                    <Card style={{ width: '100%', maxHeight: 470, padding: 10, margin: 5, alignSelf: 'center' }} elevation={9}  >
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
                                        {state.calculatedData.loading ?
                                            <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                            :
                                            <Text>All Saved: {JSON.stringify(state.calculatedData, undefined, 4)}</Text>
                                        }

                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Position:</DataTable.Title>
                                                <DataTable.Title numeric>Totals</DataTable.Title>
                                                <DataTable.Title numeric>Total %</DataTable.Title>
                                            </DataTable.Header>



                                            <DataTable.Row>
                                                <DataTable.Cell>Total uses</DataTable.Cell>
                                                <DataTable.Cell numeric>159</DataTable.Cell>
                                                <DataTable.Cell numeric>6.0</DataTable.Cell>
                                            </DataTable.Row>

                                            <DataTable.Row>
                                                <DataTable.Cell>% of total actions</DataTable.Cell>
                                                <DataTable.Cell numeric>237</DataTable.Cell>
                                                <DataTable.Cell numeric>8.0</DataTable.Cell>
                                            </DataTable.Row>

                                            <DataTable.Pagination
                                                page={0}
                                                numberOfPages={3}
                                                onPageChange={(page) => { console.log(page); }}
                                                label="1-2 of 6"
                                            />
                                        </DataTable>
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