import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import { Text, Card, Paragraph, DataTable, ActivityIndicator, Colors, Subheading } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { Tables } from '../../constants/tables';
import * as Utils from '../../utils/objectOps.js';
import * as Calculate from '../GameCalculations/calculateStats'
import { Header } from 'react-native/Libraries/NewAppScreen';



export function DisplaySelectedStats(props) {
    const [state, actions] = UseGameStore();
    const [totalActions, setTotalActions] = useState();

    useEffect(() => {
        //actions.loadTotals();
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
                                {state.calculatedData.loading ?
                                    <ActivityIndicator animating={true} color={Colors.deepOrange400} size={'large'} />
                                    :
                                    <View style={{ borderColor: 'black', borderWidth: 2, borderStyle: 'solid' }}>
                                        <Header>Found Games: {props.foundGames.length}</Header>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Action:</DataTable.Title>
                                                <DataTable.Title numeric>Totals</DataTable.Title>
                                                <DataTable.Title numeric>Total %</DataTable.Title>
                                            </DataTable.Header>

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