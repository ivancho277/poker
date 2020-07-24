import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Picker, ScrollView } from 'react-native';
import { UseGameStore, GameSubscriber } from '../../../../DataStore/GameStore.js';
import { Text, Card, Paragraph, Divider, DataTable, Surface, Title, ActivityIndicator, Button, Subheading, } from 'react-native-paper';
import { Icon, Tooltip } from 'react-native-elements';
import * as Calculate from '../../../GameCalculations/calculateStats.js';
import { Tables } from '../../../../constants/tables'



const calculatePercentage = (count, total) => {
    return Math.round(count / total * 100)
}

const addActionValues = (actions) => {
    let accum = 0;
    return actions.reduce((accum, action) => {
        return accum + action.count;
    }, accum);
}


const gppNew = (liveGame, calculatedData, found, allGamesArray) => {
    const { position, tags } = liveGame;
    let dataArray = Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount);
    let foundData = [];
    console.log("same len len");
    console.log("dataAr: ", dataArray)
    //debugger;
    let tempPositionObj = {};
    dataArray.forEach((position, i) => {
        let temp = {}
        for ([key, value] of Object.entries(position)) {
            console.log("action(key):", key + "<?>")
            console.log("pos(value):", value)

            temp[key] = {all: Object.values(value)[0] , bytag: 0 }
            //let str = key.toString();
            // temp[key].all = Object.values(value)[0]
            // temp[key].bytag = 0;
            tempPositionObj[i] = temp 
        }
        position = tempPositionObj;
        //dataArray[i] = tempPositionObj;
    });
    if (found) {
        if ((found.length === allGamesArray.length) || (found.length === 0)) {
            console.log('POTATOOOOOOOOOOOO!!!!');

            return dataArray;

        } else {
            console.log("PINAPPLE PEN");
            foundData = Calculate.percentagesPerPositionForEachAction(Calculate.sumGamesPositions(found), Calculate.sumPositionCount(found));
            foundData.forEach((position, i) => {
                for ([key, value] of Object.entries(position)) {
                    console.log("action(key):", key + "<?>")
                    console.log("pos(value):", value)
                }
            })

            let positionArr = [];
            for ([key, value] of Object.entries(foundData)) {
                //console.log("key: %j and Value: %j", key, value);
                //console.log(dataArray);
                // console.log('Value', value)
                let eachPosition = {}
                Object.entries(value).forEach((action, i) => {
                    //console.log("llop", action);
                    eachPosition[action[0]] = Object.values(action[1])[0];
                })
                positionArr.push(eachPosition);
                // console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk', Object.entries(value))
                //  dataArray[+key] = 

            }
            positionArr.forEach((pos, i) => {

            })
            console.log("Look at my array: ", positionArr);

            return positionArr;
        }
    }
    else {
        return [];
    }
}


const getPositionPercentages = (liveGame, calculatedData, found, allGamesArray) => {
    //let found = Calculate.searchByManyTags(tags, allGamesArray);
    const { position, tags } = liveGame;
    let dataArray = [];
    if (found) {
        if ((found.length === allGamesArray.length) || (found.length === 0)) {
            console.log("same len len")
            dataArray = Calculate.percentagesPerPositionForEachAction(calculatedData.positionTotals, calculatedData.positionCount)
        } else {
            dataArray = Calculate.percentagesPerPositionForEachAction(Calculate.sumGamesPositions(found), Calculate.sumPositionCount(found));
        }
        let positionArr = [];
        for ([key, value] of Object.entries(dataArray)) {
            //console.log("key: %j and Value: %j", key, value);
            //console.log(dataArray);
            // console.log('Value', value)
            let eachPosition = {}
            Object.entries(value).forEach((action, i) => {
                //console.log("llop", action);
                eachPosition[action[0]] = Object.values(action[1])[0];
            })
            positionArr.push(eachPosition);
            // console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk', Object.entries(value))
            //  dataArray[+key] = 

        }
        console.log("Look at my array: ", positionArr);
        return positionArr;
    }
    else {
        return [];
    }
}


const itemsPerPage = 2;

const items = [
    {
        key: 1,
        name: 'Page 1',
    },
    {
        key: 2,
        name: 'Page 2',
    },
    {
        key: 3,
        name: 'Page 3',
    },
];



export function LiveGameDisplayTable(props) {
    const [{ allGamesArray }, actions] = UseGameStore();
    const [isThereData, setisThereData] = useState(true);
    const [page, setPage] = React.useState(0);
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;



    useEffect(() => {
        if (allGamesArray instanceof Array) {
            if (allGamesArray.length === 0) {
                setisThereData(false)
            }
        }
    }, [])

    const mapActionsNew = (liveGame, foundGames) => {
        let displayArray = [];
        let currentPercentages = [];
        let foundPercentages = [];
        // addActionValues(liveGame.actions)
        liveGame.actions.forEach((action, i) => {
            currentPercentages.push({ [action.actionName]: { current: calculatePercentage(action.count, addActionValues(liveGame.actions)) } });
        })
        displayArray.push({ currentGame: currentPercentages })
        if (typeof foundGames === 'undefined' || typeof foundGames === 'null') {
            displayArray.push({ gamesFound: null })
            return displayArray;
        }
        else {
            console.log('FOUNDEM', foundGames);
            let sumofgamesfound = Calculate.sumGamesTotals(foundGames);
            let actions = Calculate.sumUpGameTotals(foundGames);;
            console.log("actions: ", actions)
            console.log("sum: ", sumofgamesfound)
            for ([key, value] of Object.entries(actions)) {
                console.log("key, value", key + " " + value);
                foundPercentages.push({ [key]: calculatePercentage([value], sumofgamesfound) })
            }
            displayArray.push({ gamesFound: foundPercentages })
            console.log("displayARray:", displayArray);
            return displayArray;

        }
    }

    //TOP PRIORITY: Write out my Map functions for Data Table Live
    const mapActions = (liveGame, foundGames) => {
        let displayArray = [];
        let currentPercentages = [];
        // addActionValues(liveGame.actions)
        if (typeof foundGames === 'undefined' || typeof foundGames === 'null') {
            console.log('NOT !!! FOUND GAMES');
            liveGame.actions.forEach((action, i) => {
                currentPercentages.push({ [action.actionName]: calculatePercentage(action.count, addActionValues(liveGame.actions)) });
            })
            displayArray.push({ CurrentGame: currentPercentages })
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
                <DataTable.Cell><Text>  </Text>  </DataTable.Cell>
            </DataTable.Row >
        })
    }



    //TODO: 7.14.20 
    //TODO: Write our map functions - https://trello.com/c/tEPMn8Yd/69-write-our-map-functions20 dO THIS
    const mapPositionActions = (liveGame, calculatedData, allGames, foundGames = null) => {
        let isThereSavedData = (allGames == null || allGames.length == 0) ? false : true;
        let displayArray = [];
        console.log("what did we find?", foundGames);
        if (!isThereSavedData) {
            displayArray.push({ name: 'no saved or found Games', data: [], isDisplayByPosition: true })
            console.log("if::", displayArray);
            return displayArray;
        } else if (isThereSavedData && !foundGames) {
            console.log("found.len", foundGames);
            console.log("found.len", foundGames);
            displayArray.push({ data: getPositionPercentages(liveGame, foundGames, calculatedData) });
            console.log('else if :: displayArray: %o', displayArray);
            return displayArray;
        }
        else {
            displayArray.push({ name: "display History for games with same Tag(s)", data: getPositionPercentages(liveGame, foundGames, calculatedData), isDisplayByPosition: true });
            console.log("displayArray:::else:::", displayArray);
            return displayArray;
        }
    }

    const renderTagsHeading = (tags) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Subheading>  Current Tags  </Subheading>
                <Icon name="pound" type="material-community" size={18} containerStyle={{ paddingTop: 4 }} />
                <Text style={{ fontWeight: 'bold' }}> {tags.join(', ')}</Text>
            </View>
        )
    }

    return (
        <GameSubscriber>
            {({ liveGame, calculatedData, allGamesArray }, actions) => (
                <View>
                    <Surface style={{ elevation: 10 }}>
                        {renderTagsHeading(liveGame.tags)}
                        <DataTable>
                            <DataTable.Header style={{ flex: 1, justifyContent: 'space-around', alignContent: 'space-around' }}>
                                <DataTable.Title>Actions</DataTable.Title>
                                <Tooltip containerStyle={{ height: 80 }} backgroundColor={'black'} heigh={80} width={230} popover={<Text style={{ color: 'red' }}>Percentage of times you have used actions in THIS Game </Text>}>
                                    <DataTable.Title style={{ marginEnd: 10, paddingHorizontal: 4 }}>
                                        <Text><Text style={{ color: 'purple' }}> % used</Text> </Text>
                                    </DataTable.Title>
                                </Tooltip>
                                <Tooltip containerStyle={{ height: 80 }} backgroundColor={'black'} heigh={80} width={230} popover={<Text style={{ color: 'red' }}>Historical Percentages by games with Same Tags </Text>}>
                                    <DataTable.Title style={{ marginEnd: 10, paddingHorizontal: 4 }}>
                                        <Text style={{ color: 'purple' }}>   % by Tag </Text>
                                    </DataTable.Title>
                                </Tooltip>
                                <Tooltip containerStyle={{ height: 80 }} backgroundColor={'black'} heigh={80} width={230} popover={<Text style={{ color: 'red' }}>Historical Percentage of Current Position from all Games </Text>}>
                                    <DataTable.Title style={{ marginEnd: 10, paddingHorizontal: 4 }}>
                                        <Text style={{ color: 'purple' }}>  % by Pos </Text>
                                    </DataTable.Title>
                                </Tooltip>
                                <Tooltip containerStyle={{ height: 80 }} backgroundColor={'black'} heigh={80} width={230} popover={<Text style={{ color: 'red' }}>Historical Percentage of current Position by Tag </Text>}>
                                    <DataTable.Title style={{ marginEnd: 10, paddingHorizontal: 4 }}>
                                        <Text style={{ color: 'purple' }}> % by Tag </Text>
                                    </DataTable.Title>
                                </Tooltip>
                            </DataTable.Header>
                            <ScrollView>

                                {liveGame ? (mapActionsNew(liveGame)[0].currentGame).map((action, i) => {
                                    return <DataTable.Row key={i}>
                                        <DataTable.Cell> <Text> {Object.keys(action)[0].toString()}: </Text> </DataTable.Cell>
                                        <DataTable.Cell><Text>{Object.values(action)[0].toString()}% </Text> </DataTable.Cell>
                                        <DataTable.Cell><Text>{(getPositionPercentages(liveGame, calculatedData, [], allGamesArray))[liveGame.position][Object.keys(action)[0]]}%</Text></DataTable.Cell>
                                        <DataTable.Cell><Text>{Object.values(action)[0].toString()}% </Text> </DataTable.Cell>
                                        <DataTable.Cell><Text>{(getPositionPercentages(liveGame, calculatedData, [], allGamesArray))[liveGame.position][Object.keys(action)[0]]}%</Text></DataTable.Cell>
                                    </DataTable.Row>
                                })
                                    :
                                    <DataTable.Cell>Waiting</DataTable.Cell>
                                }
                            </ScrollView>

                            <DataTable.Pagination
                                page={1}
                                numberOfPages={3}
                                onPageChange={page => {
                                    console.log(page);
                                }}
                                label="1-2 of 6"
                            />
                        </DataTable>
                        <Button title="let us test" icon="cards-diamond" onPress={() => { console.log('test we do!', gppNew(liveGame, calculatedData, Calculate.searchByManyTags(liveGame.tags, allGamesArray), allGamesArray)) }}><Text> Test dat</Text> </Button>
                    </Surface>
                </View>
            )
            }
        </GameSubscriber >
    )

}