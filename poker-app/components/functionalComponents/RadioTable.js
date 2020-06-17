import React, { useState, useEffect, } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, } from 'react-native-paper';
import { Tooltip } from 'react-native-elements';
import { Tables } from '../../constants/tables.js'


// { width: 340, height: 200, backgroundColor: 'green', borderRadius: 100, alignItems: 'center', margin: 10, opacity: .5, position: 'relative' }
export function RadioTable(props) {
    const [state, { }] = UseGameStore();
    const [value, setValue] = useState();

    useEffect(() => {
        if (props.liveGame !== null) {
            // console.log("am i here 1")
            if (value !== props.liveGame.position + 1) {
                // console.log("am i here 2")
                setValue(props.liveGame.position + 1);
                return;
            }
        } else {
            //console.log("am i here 3");
            setValue(1);
        }

    }, [props.liveGame])


    // _updateSelectedValue = value => {
    //     return 'hey'

    // }

    return (
        <GameSubscriber>
            {(state, actions) => (
                <RadioButton.Group
                    onValueChange={value => { setValue(value); props.setLivePosition(value - 1); console.log(value) }}
                    value={value}
                >
                    <View style={styles.oval}>
                        <View style={{ width: '100%', height: '100%', flexWrap: 'wrap' }} >
                            <View style={{ position: 'absolute', top: 35, left: 5, flexDirection: 'row-reverse' }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Tooltip popover={<Text>Info here</Text>}>
                                        <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[0][0]}</Text>
                                    </Tooltip>
                                </Tooltip>

                                <RadioButton color={'red'} uncheckedColor={'white'} value={1} />
                            </View>
                            <View style={{ position: 'absolute', top: 0, left: 60, flexDirection: 'row-reverse' }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[1][1]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={2} />

                            </View>
                            <View style={{ position: 'absolute', top: 0, left: 160, flexDirection: 'row-reverse' }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[2][2]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={3} />

                            </View>
                            <View style={{ position: 'absolute', top: 15, right: 30 }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[3][3]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={4} />

                            </View>
                            <View style={{ position: 'absolute', bottom: 70, right: 0 }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[4][4]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={5} />

                            </View>
                            <View style={{ position: 'absolute', bottom: 10, right: 30 }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[5][5]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={6} />

                            </View>
                            <View style={{ position: 'absolute', bottom: 0, left: 160, flexDirection: 'row-reverse' }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[6][6]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={7} />

                            </View>
                            <View style={{ position: 'absolute', bottom: 0, left: 60, flexDirection: 'row-reverse' }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[7][7]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={8} />

                            </View>
                            <View style={{ position: 'absolute', bottom: 40, left: 5, flexDirection: 'row-reverse' }}>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Text style={{ fontSize: 13, textAlign: 'center' }}>{Tables.simplePositionsArr[8][8]}</Text>
                                </Tooltip>
                                <RadioButton color={'red'} uncheckedColor={'white'} value={9} />

                            </View>
                            {/* {Tables.simplePositionsArr.map((position, i) => {
                                return (<View style={{ flex: 0, flexDirection: 'column' }} key={i}>
                                    {console.log('WTF!!!!!!', Object.values(position)[0])}
                                    {console.log('WTF!!!!!!', Object.keys(position)[0])}
                                    <RadioButton.Item style={{ flex: 1, height: 80,  flexDirection: 'column', flexBasis: 75 }} label={Object.values(position)[0]} value={Object.keys(position)[0]} />
                                </View>
                                )
                            }) */}



                        </View>



                    </View>
                </RadioButton.Group>
            )
            }
        </GameSubscriber>
    )
}


const styles = StyleSheet.create({
    oval: {

        flex: 2,
        flexWrap: "wrap",
        flexDirection: 'row',
        width: 340,
        height: 200,
        margin: 10,
        borderRadius: 100,
        //backgroundColor: 'red',
        backgroundColor: 'green',
        opacity: .5,
        borderWidth: 8,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
