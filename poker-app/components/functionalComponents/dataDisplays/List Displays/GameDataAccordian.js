import React, { Component, useContext, useEffect, useState } from 'react';
import { View, TextInput, onLongPress, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as calculations from '../../../statscalculation.js';
// const storageController = require('./AsyncStorageController.js')
// const calculations = require('./statscalculation.js')
import { UseGameStore, GameSubscriber } from '../../../../DataStore/GameStore';
import * as Calculate from '../../../GameCalculations/calculateStats.js'
import * as Utils from '../../../../utils/objectOps.js';
import { ActivityIndicator, Surface, Text, Subheading, IconButton, List, Card, Dialog, Portal, Paragraph, Divider, Title } from 'react-native-paper';
import { Button } from 'react-native-elements'
import { Tables } from '../../../../constants/tables.js';
import { getPercentages } from '../../../statscalculation.js';
import { sumUpGameTotals } from '../../../GameCalculations/calculateStats.js';
import { GameDataListItem } from './GameDataListItem'


/**
 *
 *
 * @export
 * @param {*} props
 * @returns
 */
export function GameDataAccordian(props) {
    const [{ data, liveGame, allGamesArray, calculatedData }, actions] = UseGameStore();
    const [isThereSavedData, setIsThereSavedData] = useState(false);
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const [visibleTestDialog, setVisibleTestDialog] = useState(false);
    const [visiblePOSDialog, setVisiblePOSDialog] = useState(false);

    const _hideTestDialog = () => { setVisibleTestDialog(false) };
    const _showTestDialog = () => { setVisibleTestDialog(true) };

    const _showPOSDialog = () => { setVisiblePOSDialog(true) };
    const _hidePOSDialog = () => { setVisiblePOSDialog(false) };

    useEffect(() => {
        console.log("liveGame:  ", liveGame);
        console.log('allGamesArray: %o', allGamesArray);
        if (allGamesArray.length >= 0) {
            setIsThereSavedData(true);
        }
        // let data = buildDisplayData();
        // // debugger;
        // console.log('data: %o', data);
        // let data = 
        // setDataToDisplay(data);

        // console.log("dataToDisplay: ", dataToDisplay);
        console.log("well is there?: ", isThereSavedData);

    }, [liveGame])

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


    //TODO: TODAY HERE COULD BE CAUSEING ERROR
    const getPositionPercentages = (position, foundGames) => {
        if (foundGames) {
            let dataArray = (foundGames.length === allGamesArray.length) ? Calculate.percentagesPerPositionForEachAction(Calculate.sumGamesPositions(foundGames), Calculate.sumPositionCount(foundGames))
                : Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount)
            console.log("position: ", position);
            console.log("entries, :", Object.entries(dataArray[position]))
            return Object.entries(dataArray[position]);
        }
        else {
            return [];
        }
    }

    const calculatePercentage = (count, total) => {
        console.log("count: ", count);
        console.log("totals", total);
        console.log("IS THIS IS? :", Math.round(count / total * 100))
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

    const lookAtMyData = () => {

    }

    const formatData = (arr, _cb) => {

    }


    const mapActions = (liveGame, foundGames) => {
        let displayArray = [];
        // addActionValues(liveGame.actions)
        if (!foundGames || foundGames.length === 0) {
            console.log('NOT !!! FOUND GAMES')
            liveGame.actions.forEach((action, i) => {
                displayArray.push({ name: action.actionName, data: calculatePercentage(action.count, addActionValues(liveGame.actions)) });
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
                displayArray.push({ name: [key], data: calculatePercentage([value], sumofgamesfound) })
            }
            console.log("displayARray:", displayArray);
            return displayArray;
        }
    }

    //TODO: TODAY HERE COULD BE CAUSEING ERROR
    const mapPositionActions = (liveGame, calculatedData, foundGames, isData) => {
        let displayArray = [];
        console.log("what did we find?", foundGames)
        if (!isData) {
            displayArray.push({ name: 'no saved or found Games', data: [] })
            console.log("if::", displayArray)
            return displayArray;

        } else if (isData && foundGames.length == 0) {
            console.log("found.len", foundGames.length)
            console.log("found.len", foundGames.length)

            displayArray.push({ name: 'Display History of current Position for all games', data: getPositionPercentages(liveGame.position, foundGames) });
            console.log('else if :: displayArray: %o', displayArray);
            return displayArray;
        }
        else {
            displayArray.push({ name: "display History for games with same Tag(s)", data: getPositionPercentages(liveGame.position, foundGames) });
            console.log("displayArray:::else:::", displayArray);
            return displayArray;
        }
    }

    const renderPositionActions = (liveGame, isVisible, hideDialogFun) => {
        <Portal>
            <Dialog visible={isVisible} onDismiss={hideDialogFun} >
                <Dialog.Title>Data:</Dialog.Title>
                <Dialog.ScrollArea>

                    <Divider />
                    {isThereSavedData?
                        <Dialog.Content>
                            {mapPositionActions(liveGame, calculatedData, Calculate.searchByManyTags(liveGame.tags, allGamesArray, isThereSavedData)).map((element, i) => {
                                return <Paragraph key={i}>{`${element[0]}: ${element[1][Object.keys(element[1])[0]]}% \n`}</Paragraph>
                            })}
                        </Dialog.Content>
                        :
                        <Dialog.Content>
                            <Title>No Saved Data</Title>

                        </Dialog.Content>
                    }
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button title='Cancal' onPress={() => hideDialogFun()} />

                    <Button title='Ok' onPress={() => hideDialogFun()} />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    }

    //NOTE: 7/1/2020 ---- remeber that I should possibly need to add another param, that takes in the allGames array.
    /**
     * @param {type} property - description.
     */
    const renderActions = (liveGame, isVisible, hideDialogFun) => {
        return (
            <Portal>
                <Dialog visible={isVisible} onDismiss={hideDialogFun} >
                    <Dialog.Title>Data:</Dialog.Title>
                    <Dialog.ScrollArea>

                        <Divider />
                        {liveGame.tags.length > 0 ?
                            <Dialog.Content>
                                {mapActions(liveGame, Calculate.searchByManyTags(liveGame.tags, allGamesArray)).map((element, i) => {
                                    return <Paragraph key={i}>{`${element.name}: ${element.data}% \n`}</Paragraph>
                                })}
                            </Dialog.Content>
                            :
                            <Dialog.Content>
                                {mapActions(liveGame, null).map((element, i) => {
                                    return <Paragraph key={i}>{`${element.name}: ${element.data}% \n`}</Paragraph>
                                })
                                }
                            </Dialog.Content>
                        }

                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                        <Button title='Cancal' onPress={() => hideDialogFun()} />

                        <Button title='Ok' onPress={() => hideDialogFun()} />
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }



    return (
        <GameSubscriber>
            {({ liveGame, allGamesArray, calculatedData }, actions) =>
                <View>

                    <Button title="SHOW DATA" onPress={_showTestDialog}>Show Data</Button>
                    <Divider />
                    {/* <Button title="LOG OTHER DATA" onPress={() => { mapPositionActions(liveGame, calculatedData, Calculate.searchByManyTags(liveGame.tags, allGamesArray)) }} style={{ color: "red" }} /> */}
                    <Button title="LOG OTHER DATA" onPress={_showPOSDialog} style={{ color: "red" }} />
                    {renderActions(liveGame, visibleTestDialog, _hideTestDialog)}
                    {renderPositionActions(liveGame, visiblePOSDialog, _hidePOSDialog)}
                </View>
            }
        </GameSubscriber>
    )


}


//     /**
//      *
//      *
//      * @param {Object} liveGame - *current game in progress Object Data
//      * @param {Array} foundGames - *an array of games found by tags, or all games if none found
//      * @returns {Array} - array of Objects formatted to be mapped and displayed as list  
//      */
//     const currentPercentageDisplayArr = (liveGame, foundGames) => {
//         let livePercentages = [];
//         let liveGameSum = addActionValues(liveGame.actions);
//         let foundGamesSum = 0;
//         if (isThereSavedData) {
//             foundGamesSum = Calculate.sumGamesTotals(foundGames)
//             console.log("cool",foundGamesSum);
//             console.log("cooler", foundGamesSum + liveGameSum)
//             liveGame.actions.forEach(element => {
//                 livePercentages.push({ name: element.actionName, data: calculatePercentage(element.count, liveGameSum) })
//             });

//             return livePercentages;
//         }
//         else {
//             console.log("uncool", liveGameSum);
//             liveGame.actions.forEach(element => {
//                 livePercentages.push({ name: element.actionName, data: calculatePercentage(element.count, liveGameSum) })
//             });
//             return livePercentages;
//         }

//     }
//     /**
//      *
//      *
//      * @param {Array} foundGames - array of found games by tag
//      * @returns Array Formatted to be displayed in a mapped list
//      */
//     const positionActionDisplayArr = (foundGames) => {
//         if(isThereSavedData){
//             return positionObjectArrayToMatrix((Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount)));
//         }
//         if (foundGames) {
//             return positionObjectArrayToMatrix((Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount)));
//         }
//         return [];
//     }
//     /**
//      *
//      *
//      * @param {*} position
//      * @returns
//      */
//     const buildDisplayData = (position) => {
//         let finalDisplay = [];
//         let currentPercent = [];
//         let positionPercent = [];

//             currentPercent.push(currentPercentageDisplayArr(liveGame));
//             positionPercent.push(positionActionDisplayArr(liveGame.position)); 
//             finalDisplay.push({
//                 data: currentPercent, listTitle: 'Current Game %', isDisplayByPosition: false 
//             })
//             finalDisplay.push({
//                 data: positionPercent , listTitle: `Historical % for current position: ${liveGame.position}`, isDisplayByPosition: true 
//             })


//         return finalDisplay;
//         // let finaldisplayArray = [];
//         // let currentLivePercent = [];
//         // let percentPerPosition = [];
//         // let holdingArray = [];
//         // if (addActionValues(liveGame.actions) == 0) {  //checks to see if its is first move.
//         //     finaldisplayArray.push({ name: 'Start Playing!' })
//         // } else {
//         //     liveGame.actions.forEach(element => {
//         //         currentLivePercent.push({ name: element.actionName, data: calculatePercentage(element.count, addActionValues(liveGame.actions)) })
//         //     })
//         //     console.log('WHAT BITCH', Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount));
//         //     let tempArr = Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount);
//         //     percentPerPosition = positionObjectArrayToMatrix(tempArr);

//         //     //console.log("MY Damn FUcking ArrAy",holdingArray)
//         //     //holdingArray.push({ data: Object.entries(currentLivePercent[liveGame.position]), name: `Stats for Position: ${liveGame.position}` });
//         //     finaldisplayArray.push({
//         //         data: currentLivePercent, listTitle: 'Current Game %', isDisplayByPosition: false
//         //     });
//         //     finaldisplayArray.push({ data: percentPerPosition, listTitle: `Historical % for current position: ${liveGame.position}`, isDisplayByPosition: true });
//         // }
//         // //debugger;
//         // return finaldisplayArray;

//     }



//     // return <View>
//     //     <Button title={'Test it'} onPress={() => { console.log('buildDisplayData(): ', buildDisplayData()); }} />
//     //     <Button title={'Test it 2'} onPress={() => { console.log('dataToDisplay: ', dataToDisplay); }} />
//     //     <Button title={'Test it 3: test returns'} onPress={() => { console.log("does it wpork?:", positionObjectArrayToMatrix()) }} />

//     // </View>
//     return (<Card>
//         <Card.Title title='     Game Stats' />
//         <Card.Content>
//             {(isThereSavedData && (addActionValues(liveGame.actions) > 0)) ?
//                 dataToDisplay.map((element, i) => {
//                     return <View>
//                         <GameDataListItem
//                             key={`ListSection_${i}`}
//                             gameDataObject={element}
//                             listTitle={element.listTitle}
//                         />
//                     </View>
//                 })
//                 :
//                 <View>
//                     <Text> This is some text. </Text>
//                 </View>
//             }
//         </ Card.Content>
//     </Card>
//     )

// }




// //        gameDataObject={element.changeToArray ? Object.entries(element.data[liveGame.position]) : element.data} 


//     // //!!TODO:ended here 6/25/2020
//     // const buildDisplayData = () => {
//     //     let displayArray = [];
//     //     let currentLiveData = [];
//     //     if (addActionValues(liveGame.actions) == 0) {  //checks to see if its is first move.
//     //         currentLiveData.push({ name: 'Start Playing!' })
//     //     } else if (liveGame.tags.length == 0) {
//     //         liveGame.actions.forEach(element => {
//     //             currentLiveData.push({ name: element.actionName, data: calculatePercentage(element.count, addActionValues(liveGame.actions)) })
//     //             currentLiveData.push({ name: liveGame.position, data: Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount) })
//     //         })
//     //         // currentLiveData.push({ name: liveGame.position, data: Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount) })

//     //     }
//     //     else {

//     //     }
//     //     return { data: currentLiveData, listTitle: 'Current Game %' };
//     // }


//     // //TODO: 6/25/2020 this should be mapping the GameDataList item Getting cant read propert .map() of undefined..
//     // // return <Button title={'Test it'} onPress={() => { console.log('buildDisplayData(): %o', buildDisplayData());}} />
//     // return (buildDisplayData().data.map((element, i) => {
//     //     return (<GameDataListItem
//     //         gameDataObject={element}

//     //     />)
//     // })

//     // )

// // }