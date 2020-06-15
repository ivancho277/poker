import React, { useState, useEffect, } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View, StyleSheet } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';
import { Tables } from '../../constants/tables.js'


// { width: 340, height: 200, backgroundColor: 'green', borderRadius: 100, alignItems: 'center', margin: 10, opacity: .5, position: 'relative' }
export function RadioTable(props) {
    const [value, setValue] = useState('hi')


    return (
        <GameSubscriber>
            {(state, actions) => (
                <RadioButton.Group
                    onValueChange={value => { setValue(value); }}
                    value={value}
                >
                    <View style={styles.oval}>


                        <View style={{ width: '100%', height: '100%', position: 'absolute', flexDirection: 'row', flexWrap: 'wrap' }} >
                            {Tables.simplePositionsArr.map((position, i) => {
                                return (<View style={{ flex: 0, flexDirection: 'column' }} key={i}>
                                    {console.log('WTF!!!!!!', Object.values(position)[0])}
                                    {console.log('WTF!!!!!!', Object.keys(position)[0])}
                                    <RadioButton.Item style={{ flex: 1, height: 80,  flexDirection: 'column', flexBasis: 75 }} label={Object.values(position)[0]} value={Object.keys(position)[0]} />
                                </View>
                                )
                            })


                            }
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
