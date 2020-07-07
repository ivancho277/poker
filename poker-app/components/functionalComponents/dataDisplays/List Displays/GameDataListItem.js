import React, { Component, useContext, useEffect, useState } from 'react';
import { View, TextInput, onLongPress, StyleSheet } from 'react-native';
import Radio from '../../../Radio.js';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as calculations from '../../../statscalculation.js';
import { StorageAPI } from '../../../storageAPI/AsyncStorageController'
import { AddTag } from '../../AddTag'
// const storageController = require('./AsyncStorageController.js')
// const calculations = require('./statscalculation.js')
import { UseGameStore, GameSubscriber } from '../../../../DataStore/GameStore';
import * as Calculate from '../../../GameCalculations/calculateStats.js'
import * as Utils from '../../../../utils/objectOps.js';
import { ActivityIndicator, Colors, Surface, Text, Subheading, IconButton, List, Divider, Card } from 'react-native-paper';
import TagDialog from '../../TagDialog';
import { Tables } from '../../../../constants/tables.js';
import { getPercentages } from '../../../statscalculation.js';
import { sumUpGameTotals } from '../../../GameCalculations/calculateStats.js';
import { ChipButton } from '../../ChipButton';

//TODO: 7.7.2020 Write me!
export function RenderPercentByAction(props) {
    //NOTE: 7.7.2020 have props state if we are rendering by tags or just all games.
    return (props.byTag ?
        <View></View>
        :
        <View></View>
    )
}

RenderPercentByAction.defaultProps = {
    byTag: false
}

//TODO: 7.7.2020 Write me!
export function RenderPercentByPositionByAction(props) {
    //NOTE: 7.7.2020 have prop to choose if we are rendering based on allGames of found Tags
}

RenderPercentByPositionByAction.defaultProps = {
    byTag: false,
}



export function GameDataListItem(props) {
    const [{ data, liveGame, allGamesArray, calculatedData }, actions] = UseGameStore();
    const [isThereSavedData, setIsThereSavedData] = useState(false);
    const [expanded, setExpanded] = useState(true);

    const _handlePress = () => {
        console.log(props.gameDataArray);
        console.log("NO SKATING HERE,", props.gameDataArray[0].data)
        setExpanded(!expanded);
    }



    useEffect(() => {
        console.log("liveGame:  ", liveGame);
        console.log('allGamesArray: %o', allGamesArray);
        console.log('props.gameDataObjevt: ', props.gameDataArray);
        // debugger;
        if (allGamesArray.length >= 0) {
            setIsThereSavedData(true);
        }
    }, [liveGame.position])

    const addActionValues = (actions) => {
        let accum = 0;
        return actions.reduce((accum, action) => {
            return accum + action.count;
        }, accum);
    }

    const getPercentagesForPositionsDisplay = (position) => {
        if (allGamesArray.length === 0) {
            return [];
        }
        let dataArray = Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount);
        return Object.entries(dataArray[position]);
    }
    const getPercentagesForPositionsDisplayBYTAG = (position) => {
        if (allGamesArray.length === 0) {
            return [];
        }
        let found = Calculate.searchByManyTags(liveGame.tags, allGamesArray);
        let dataArray = Calculate.percentagesPerPositionForEachAction(Calculate.sumGamesPositions(found), Calculate.sumPositionCount(found));
        return Object.entries(dataArray[position]);
    }

    const calculatePercentage = (count, total) => {
        return Math.round(count / total * 100)
    }

    const renderItemText = (action, foundsum) => {
        return `${action.actionName}: ${calculatePercentage(action.count, foundsum)}% `
    }


    return (
        <GameSubscriber>
            {({ liveGame }, actions) => (
                <Surface style={{ elevation: 2, flex: 1, }}>


                    <List.Section>
                        <List.Accordion
                            titleStyle={{ color: 'black', textDecorationLine: 'underline', fontSize: 14, borderColor: 'red', borderWidth: 1, borderStyle: 'dotted' }}
                            style={{ lineHeight: 20 }}
                            title={props.listTitle}
                            expanded={expanded}
                            onPress={_handlePress}
                        >
                            {(props.gameDataArray === undefined) ?
                                <Text>I AM undefined</Text>

                                :
                                (!props.isDisplayByPosition) ?
                                    props.gameDataArray.map((element, i) => {
                                        return <View key={`item_${i}`}>
                                            <List.Item
                                                style={{ height: 15, padding: 3, margin: 3, }}
                                                titleStyle={{ fontSize: 13, lineHeight: 15 }}
                                                title={`${element.name}: ${element.data} %`}
                                                left={() => <List.Icon icon='cards-spade' color='black' />}
                                            />
                                        </View>
                                    })
                                    :
                                    (props.gameDataArray[0].data).map((elem, j) => {
                                        return (
                                            (elem != null || elem != undefined) ?
                                                <List.Item
                                                    key={`item_$_${j}`}
                                                    style={{ padding: 3, margin: 3, height: 15, }}
                                                    titleStyle={{ fontSize: 13, lineHeight: 15 }}
                                                    title={`${elem[0]}: ${elem[1][(liveGame.position)]} %`}
                                                    left={() => <List.Icon icon='cards-spade' color='black' />}
                                                />
                                                :
                                                <Text>No Saved Data</Text>
                                        )
                                    })

                            }
                        </List.Accordion>
                    </List.Section>

                </Surface>
            )}
        </GameSubscriber>
    )








}
