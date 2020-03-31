import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import { Text, Card, Paragraph, DataTable } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';



export function DisplayStats() {
    const [state, actions] = UseGameStore();


    return (
        
            <Card style={{ width: '95%', padding: 10, marginTop: 5, alignSelf: 'center' }} elevation={9}  >
                <Card.Title title="My Stats!" subtitle="Totals" />
                <ScrollView>
                    <Card.Content>
                        <View style={{ borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Dessert</DataTable.Title>
                                    <DataTable.Title numeric>Calories</DataTable.Title>
                                    <DataTable.Title numeric>Fat</DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                                    <DataTable.Cell numeric>159</DataTable.Cell>
                                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                                    <DataTable.Cell numeric>237</DataTable.Cell>
                                    <DataTable.Cell numeric>8.0</DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Pagination
                                    page={1}
                                    numberOfPages={3}
                                    onPageChange={(page) => { console.log(page); }}
                                    label="1-2 of 6"
                                />
                            </DataTable>
                        </View>
                    </Card.Content>
                </ScrollView>
            </Card>
        

    )
}