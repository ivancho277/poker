import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore';
import { Text, Card, Paragraph, DataTable, ActivityIndicator, Colors, Subheading } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import { Tables } from '../../constants/tables';
import * as Utils from '../../utils/objectOps.js';
import * as Calculate from '../GameCalculations/calculateStats'
import { Header } from 'react-native/Libraries/NewAppScreen';
import { keyframes } from 'styled-components';



export function DisplaySelectedStats(props) {
    const [state, actions] = UseGameStore();
    const [totalActions, setTotalActions] = useState();


    useEffect(() => {
        //actions.loadTotals();
    }, [props.foundGames])

    const calculatePercentageVsAllGames = (foundGames, allGames) => {

    }

    const calculatePercentageOnFoundOnly = (foundGames) => {
        let totalNumber = Calculate.sumGamesTotals(foundGames);

    }

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
                                <DataTable.Title >Totals</DataTable.Title>
                                <DataTable.Title >% of all Games</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {(props.foundGames === null || props.foundGames.length === 0) ? <Subheading>No found Games</Subheading>
                                    :
                                    // for(let [key, value] of Object.entries(props.foundGames)){

                                    // }
                                    <View>
                                        {/* <Text>{JSON.stringify(Calculate.sumGamesTotals(props.foundGames))}</Text> */}
                                        {Object.entries(Calculate.sumUpGameTotals(props.foundGames)).map(element => {
                                            let printout = element
                                            console.log(printout);
                                            return <DataTable.Row key={`row_${printout[0]}`}>
                                                <DataTable.Cell key={`${printout[0]}`}>{printout[0]}</DataTable.Cell>
                                                <DataTable.Cell key={`countOf_${printout[0]}`}>       {printout[1]}</DataTable.Cell>
                                                <DataTable.Cell key={`percentOf_${printout[0]}`}>        {calculatePercentage(printout[1], Calculate.sumGamesTotals(props.foundGames))}%</DataTable.Cell>

                                            </DataTable.Row>
                                        })
                                        }
                                    </View>


                                    //     props.foundGames.map(element => {
                                    //         let keysArr = Object.keys(element);
                                    //         let gameKey = keysArr[0]
                                    //         return (
                                    //         element[gameKey].totals.map(total => {
                                    //         return <Text>{JSON.stringify(total)}</Text>
                                    //         })
                                    //         // <DataTable.Row key={`${}`}>

                                    //         // </DataTable.Row>
                                    //     )
                                    // })
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