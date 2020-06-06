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
    }, [props.foundGames])

    const calculatePercentage = (count, total) => {
        return Math.round(count / total * 100)
    }


    /**
     * 
     */
    return (
        <GameSubscriber>
            {(state, actions) => (
                <View style={{ width: '100%', height: 350, maxHeight: 400 }}>
                    <Card style={{ width: '90%',padding: 10, margin: 5, alignSelf: 'center' }} elevation={9}  >
                        <Card.Title title="Display my stats" subtitle="Yes" />
                        <Card.Content>
                            <Paragraph>Number of found Games: {props.foundGames !== null ? props.foundGames.length : "No games found."}</Paragraph>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Action:</DataTable.Title>
                                    <DataTable.Title numeric>Totals</DataTable.Title>
                                    <DataTable.Title numeric>% of all Games</DataTable.Title>
                                </DataTable.Header>
                                { props.foundGames ? <Subheading>No found Games</Subheading>
                                    :
                                    props.foundGames.map(element => {
                                       return <Text> {JSON.stringify(element, undefined, 3)} </Text>
                                    })
                                } 
                            </DataTable>
                        </Card.Content>
                    </Card>
                </View>
            )
            }
        </GameSubscriber>



    )
}