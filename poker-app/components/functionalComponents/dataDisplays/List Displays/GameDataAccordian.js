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
import { ActivityIndicator, Colors, Surface, Text, Subheading, IconButton, List } from 'react-native-paper';
import TagDialog from '../../TagDialog';
import { Tables } from '../../../../constants/tables.js';
import { getPercentages } from '../../../statscalculation.js';
import { sumUpGameTotals } from '../../../GameCalculations/calculateStats.js';
import { ChipButton } from '../../ChipButton';
import { GameDataListItem } from './GameDataListItem'

export function GameDataAccordian(props) {
    const [{ data, liveGame, allGamesArray, calculatedData }, actions] = UseGameStore();
    const [isThereSavedData, setIsThereSavedData] = useState(false);
    const [dataToDisplay, setDataToDisplay] = useState([]);


    useEffect(() => {
        console.log("liveGame:  ", liveGame);
        console.log('allGamesArray: %o', allGamesArray);
        if (allGamesArray.length >= 0) {
            setIsThereSavedData(true);
        }
        let data = buildDisplayData();
       // debugger;
        console.log('data: %o', data);
        if (dataToDisplay.length !== data.length) {
            setDataToDisplay(data);
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

    //TODO: ended here for more work on 6/26/2020
    const positionObjectArrayToMatrix = (arr) => {
        if (allGamesArray instanceof Array && allGamesArray.length > 0) {
            let matrix = Object.entries(arr);
            // console.log(matrix)
            let middleArr = matrix.map((element, i) => {
                let position = element[0];
                //   let temparr = {position: element[0], data:{} }  
                let temparr = []
                console.log(`LOOOK AT ${position}`, Object.entries(element[1]));
                for (let [key, value] of Object.entries(element[1])) {
                    temparr.push({ [key]: Object.values(value)[0] })
                    //console.log('key: %s, val: %s', key, Object.values(value)[0]);
                }
                return temparr;
            })
            return middleArr;
        }
        return null;
    }






    const buildDisplayData = (position) => {
        let finaldisplayArray = [];
        let currentLivePercent = [];
        let percentPerPosition = [];
        let holdingArray = [];
        if (addActionValues(liveGame.actions) == 0) {  //checks to see if its is first move.
            finaldisplayArray.push({ name: 'Start Playing!' })
        } else {
            liveGame.actions.forEach(element => {
                currentLivePercent.push({ name: element.actionName, data: calculatePercentage(element.count, addActionValues(liveGame.actions)) })
            })
            console.log('WHAT BITCH', Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount));
            let tempArr = Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount);
            percentPerPosition = positionObjectArrayToMatrix(tempArr); 
            
            //console.log("MY Damn FUcking ArrAy",holdingArray)
            //holdingArray.push({ data: Object.entries(currentLivePercent[liveGame.position]), name: `Stats for Position: ${liveGame.position}` });
            finaldisplayArray.push({ data: currentLivePercent, listTitle: 'Current Game %', isDisplayByPosition: false});
            finaldisplayArray.push({ data: percentPerPosition, listTitle: 'Historical % for current position', isDisplayByPosition: true });
        }
        //debugger;
        return finaldisplayArray;

    }



    // return <View>
    //     <Button title={'Test it'} onPress={() => { console.log('buildDisplayData(): ', buildDisplayData()); }} />
    //     <Button title={'Test it 2'} onPress={() => { console.log('dataToDisplay: ', dataToDisplay); }} />
    //     <Button title={'Test it 3: test returns'} onPress={() => { console.log("does it wpork?:", positionObjectArrayToMatrix()) }} />

    // </View>
    return ( addActionValues(liveGame.actions) === 0 ) ?
    dataToDisplay.map((element, i) => {
        return <View>
            <GameDataListItem
                key={`ListSection_${i}`}
                gameDataObject={element}
                listTitle={element.listTitle}

            />
        </View>
    }) :
    <View>
        <Text> This is some text. </Text>
    </View>


}




//        gameDataObject={element.changeToArray ? Object.entries(element.data[liveGame.position]) : element.data} 


    // //!!TODO:ended here 6/25/2020
    // const buildDisplayData = () => {
    //     let displayArray = [];
    //     let currentLiveData = [];
    //     if (addActionValues(liveGame.actions) == 0) {  //checks to see if its is first move.
    //         currentLiveData.push({ name: 'Start Playing!' })
    //     } else if (liveGame.tags.length == 0) {
    //         liveGame.actions.forEach(element => {
    //             currentLiveData.push({ name: element.actionName, data: calculatePercentage(element.count, addActionValues(liveGame.actions)) })
    //             currentLiveData.push({ name: liveGame.position, data: Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount) })
    //         })
    //         // currentLiveData.push({ name: liveGame.position, data: Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount) })

    //     }
    //     else {

    //     }
    //     return { data: currentLiveData, listTitle: 'Current Game %' };
    // }


    // //TODO: 6/25/2020 this should be mapping the GameDataList item Getting cant read propert .map() of undefined..
    // // return <Button title={'Test it'} onPress={() => { console.log('buildDisplayData(): %o', buildDisplayData());}} />
    // return (buildDisplayData().data.map((element, i) => {
    //     return (<GameDataListItem
    //         gameDataObject={element}

    //     />)
    // })

    // )

// }