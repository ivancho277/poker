import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../../../DataStore/GameStore.js';
import { Text, Card, Paragraph, Divider, DataTable, Surface, Title, ActivityIndicator, Button, Subheading } from 'react-native-paper';
import * as Calculate from '../../../GameCalculations/calculateStats.js';
import { isUndefined } from 'underscore';
import { Tables } from '../../../../constants/tables.js';
import { Header } from 'react-native/Libraries/NewAppScreen';

const calculatePercentage = (count, total) => {
    return Math.round(count / total * 100)
}

const addActionValues = (actions) => {
    let accum = 0;
    return actions.reduce((accum, action) => {
        return accum + action.count;
    }, accum);
}

export function LiveGameDisplayTable(props) {
    const [{ allGamesArray }, actions] = UseGameStore();
    const [isThereData, setisThereData] = useState(true);




    useEffect(() => {
        if (allGamesArray instanceof Array) {
            if (allGamesArray.length === 0) {
                setisThereData(false)
            }
        }
    }, [])


    //TOP PRIORITY: Write out my Map functions for Data Table Live
    const mapActions = (liveGame, foundGames) => {
        let displayArray = [];
        // addActionValues(liveGame.actions)
        if (typeof foundGames === 'undefined' || typeof foundGames === 'null') {
            console.log('NOT !!! FOUND GAMES');
            liveGame.actions.forEach((action, i) => {
                displayArray.push({ [action.actionName]: calculatePercentage(action.count, addActionValues(liveGame.actions)) });
            })
            console.log("displayARray:", displayArray)
            return displayArray;
        }
        else {
            console.log('FOUNDEM', foundGames);
            let sumofgamesfound = Calculate.sumGamesTotals(foundGames);
            let actions = Calculate.sumUpGameTotals(foundGames);;
            console.log("actions: ", actions)
            console.log("sum: ", sumofgamesfound)
            for ([key, value] of Object.entries(actions)) {
                console.log("key, value", key + " " + value)
                displayArray.push({ [key]: calculatePercentage([value], sumofgamesfound) })
            }
            console.log("displayARray:", displayArray);
            return displayArray;
        }
    }

    const renderRow = (liveGame, foundGames) => {
        
        return mapActions(liveGame).map((action, i) => {
               return <DataTable.Row key={i}>
                    <DataTable.Cell><Text>{Object.keys(action)[0].toString()} </Text> </DataTable.Cell>
                    <DataTable.Cell><Text> {Object.values(action)[0].toString()} </Text> </DataTable.Cell>
                </DataTable.Row >
            })
    }



    //TODO: 7.14.20
    //TODO: Write our map functions - https://trello.com/c/tEPMn8Yd/69-write-our-map-functions20 dO THIS

    const mapPositionActions = (liveGame, calculatedData, foundGames, allGames) => {
        let isThereSavedData = (allGames == null || allGames.length == 0) ? false : true
        let displayArray = [];
        console.log("what did we find?", foundGames)
        if (!isThereSavedData) {
            displayArray.push({ name: 'no saved or found Games', data: [], isDisplayByPosition: true })
            console.log("if::", displayArray)
            return displayArray;
        } else if (isThereSavedData && !foundGames) {
            console.log("found.len", foundGames);
            console.log("found.len", foundGames);
            displayArray.push({ name: 'Display History of current Position for all games', data: getPositionPercentages(liveGame, foundGames, calculatedData), isDisplayByPosition: true });
            console.log('else if :: displayArray: %o', displayArray);
            return displayArray;
        }
        else {
            displayArray.push({ name: "display History for games with same Tag(s)", data: getPositionPercentages(liveGame, foundGames, calculatedData), isDisplayByPosition: true });
            console.log("displayArray:::else:::", displayArray);
            return displayArray;
        }
    }





    return (
        <GameSubscriber>
            {(state, actions) => (
                <View>
                    <Surface style={{ elevation: 10 }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Actions</DataTable.Title>
                                <DataTable.Title>% used</DataTable.Title>
                                <DataTable.Title>% used (from games w/ same tags) </DataTable.Title>
                                <DataTable.Title>% By Position</DataTable.Title>
                                <DataTable.Title>% By Position (w/ same tags)</DataTable.Title>





                            </DataTable.Header>
                            
                            <DataTable.Cell>nothing</DataTable.Cell> 
                        </DataTable>
                        <Button title="let us test" onPress={() => { console.log('test we do!', mapActions(state.liveGame)) }} >Test dat </Button>
                    </Surface>
                </View>
            )
            }
        </GameSubscriber>
    )

}