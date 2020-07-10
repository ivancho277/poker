import React, { Component, useContext, useEffect, useState } from 'react';
import { View, TextInput, onLongPress, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as calculations from '../../../statscalculation.js';
import { UseGameStore, GameSubscriber } from '../../../../DataStore/GameStore';
import * as Calculate from '../../../GameCalculations/calculateStats.js'
import * as Utils from '../../../../utils/objectOps.js';
import { Button, ActivityIndicator, Colors, Surface, Text, Subheading, IconButton, List, Divider, Card, Paragraph } from 'react-native-paper';
import { Tables } from '../../../../constants/tables.js';




export function RenderListFromAllGames(props) {
    useEffect(() => {
        console.log('RLAll: ', props);
    }, [])
    return (
        <View>
            <Surface>
            {props.gameDataArray.map((element, i) => {
                    return (<View key={`item_${i}`}>
                        <List.Item
                            style={{ height: 15, padding: 3, margin: 3, flex: 1 }}
                            titleStyle={{ fontSize: 13, lineHeight: 15 }}
                            title={`${element.name}: ${element.data} %`}
                            left={() => <List.Icon icon='cards-spade' color='black' />}
                        />
                    </View>)
                })
                }
            </Surface>
        </View>
    )
}

export function RenderListFromFoundGames(props) {
    useEffect(() => {
        console.log('RLAll: ', props);
    }, [])
    return (
        <View>

        </View>
    )

}

export function RenderPositionListAllGames(props) {
    useEffect(() => {
        console.log('RLAll: ', props);
    }, [])

    return (
        <View>
            
        </View>
    )
}

export function RenderPositionListFoundGames(props) {
    useEffect(() => {
        console.log('RLAll: ', props);
    }, [])

    return (
        <View>
            
        </View>
    )
}

export function RenderPercentByAction(props) {
    useEffect(() => {
        console.log('props,', props)
    }, [])
    //NOTE: 7.7.2020 have props state if we are rendering by tags or just all games.
    return (
        <View style={{ magrin: 5 }}>
            <Surface style={{ flexGrow: 10 }}>
                {props.gameDataArray.map((element, i) => {
                    return (<View key={`item_${i}`}>
                        <List.Item
                            style={{ height: 15, padding: 3, margin: 3, flex: 1 }}
                            titleStyle={{ fontSize: 13, lineHeight: 15 }}
                            title={`${element.name}: ${element.data} %`}
                            left={() => <List.Icon icon='cards-spade' color='black' />}
                        />
                    </View>)
                })
                }
            </Surface>
        </View>
    )
}

RenderPercentByAction.defaultProps = {
    byTag: false
}

//TODO: 7.7.2020 Write me!
export function RenderPercentByPositionByAction(props) {
    useEffect(() => {
        console.log('props,', props)
    }, [])
    //NOTE: 7.7.2020 have prop to choose if we are rendering based on allGames of found Tags
    return (<View style={{ magrin: 5 }}>
        <Surface style={{ flexGrow: 10 }} >
            {(props.gameDataArray[0].data).map((elem, j) => {
                return ((elem != null || elem != undefined) ?
                    <List.Item
                        key={`item_$_${j}`}
                        style={{ padding: 3, margin: 3, height: 15, flex: 1 }}
                        titleStyle={{ fontSize: 13, lineHeight: 15 }}
                        title={`${elem[0]}: ${elem[1][(props.liveGame.position)]} %`}
                        left={() => <List.Icon icon='cards-spade' color='black' />}
                    />
                    :

                    <Paragraph>No Saved Data</Paragraph>
                )
            })
            }
        </Surface>
    </View>
    )
}

RenderPercentByPositionByAction.defaultProps = {
    byTag: false,
}
