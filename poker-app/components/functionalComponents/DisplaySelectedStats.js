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
                
                    <Card style={{ width: '90%', padding: 10, margin: 5, alignSelf: 'center' }} elevation={9}  >
                        <Card.Title title="Display my stats" subtitle="Yes" />
                        <Card.Content>
                            <Paragraph>Number of found Games: {props.foundGames !== null ? props.foundGames.length : "No games found."}</Paragraph>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Action:</DataTable.Title>
                                    <DataTable.Title numeric>Totals</DataTable.Title>
                                    <DataTable.Title numeric>% of all Games</DataTable.Title>
                                </DataTable.Header>
                                <ScrollView>
                                    {(props.foundGames === null || props.foundGames.length === 0) ? <Subheading>No found Games</Subheading>
                                        :
                                        // for(let [key, value] of Object.entries(props.foundGames)){

                                        // }
                                        props.foundGames.map(element => {
                                            let keysArr = Object.keys(element);
                                            let gameKey = keysArr[0]
                                            return (
                                            element[gameKey].totals.map(total => {
                                            return <Text>{JSON.stringify(total)}</Text>
                                            })
                                            // <DataTable.Row key={`${}`}>
                                            
                                            // </DataTable.Row>
                                        )
                                    })
                                    }
                                </ScrollView>
                            </DataTable>
                        </Card.Content>
                    </Card>
               
            )
            }
        </GameSubscriber>



    )
}