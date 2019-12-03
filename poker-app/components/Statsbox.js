import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ImageBackground, ScrollView } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { MyContext } from '../stateContext/GlobalState';
import Divider from "react-native-divider";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
//import { ScrollView } from 'react-native-gesture-handler';

const calculation = require('./statscalculation.js');
const storage = require("./AsyncStorageController.js");
const cardImg = require('../images/ace_diamond.jpg');


export default function Statsbox(props) {
    //will pull saved information about users stats and display them back in the box.   
    const [isOnPositionStats, setPositionStats] = useState(false);


    const isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const onToggle = (isOn) => {
        console.log("Changed to " + isOn);
    }

    const objToArray = (obj) => {
        // let values = Object.values(obj);
        let objArray = [];
        for (key in obj) {
            objArray.push({ [key]: obj[key] })
        }
        console.log('OBJECT ARRAY', objArray)
        return objArray
    }


    return (
        <View >

            <MyContext.Consumer>
                {(context) => <View style={{display: 'flex', justifyContent: "center"}}>
                    {props.loading
                        ?
                        <View style={[spinnerStyles.container, spinnerStyles.horizontal]}>
                            <ActivityIndicator size='small' color='#0000ff' />
                        </View>
                        :
                        isEmpty(context.state.gamesObj) || context.state.gamesObj === [{}]
                            ?
                            <Text>Nothing here</Text>
                            :
                            isOnPositionStats === true
                                ?
                                <View>
                                    <Card title='By percentge: ' containerStyle={{ width: props.width, marginBottom: 10, padding: 10}}>
                                        {/* <Divider> By percentage: {'\n'} </Divider> */}
                                        {/* <Text style={{fontSize: 16, opacity: 1, textAlign: 'center'}}> */}
                                        <ScrollView>
                                            {calculation.getPercentages(context.state.gamesObj).map((action, i) => {
                                                return <ListItem key={i} title={`${[Object.keys(action)]}s: ${action[Object.keys(action)[0]]}% \n`} />
                                            })}
                                            <ToggleSwitch

                                                isOn={isOnPositionStats}
                                                onColor="green"
                                                offColor="red"
                                                label="Change View"
                                                labelStyle={{ color: "black", fontWeight: "900" }}
                                                size="mediuim"
                                                onToggle={isOnPositionStats => {
                                                    setPositionStats(isOnPositionStats);
                                                    onToggle(isOnPositionStats);
                                                }}

                                            />
                                        </ScrollView>
                                        {/* </Text> */}
                                    </Card>
                                </View>
                                :
                                <View>
                                    <Card title='Totals: ' containerStyle={{width: props.width, marginBottom: 10, padding: 10}}>
                                        {/* <Divider>Total Stats:{'\n'}</Divider> */}
                                        {/* <Text style={{opacity: 1, textAlign: 'center', fontSize: 16 }} > */}
                                        <ScrollView>
                                            {objToArray(calculation.calculateTotalStats(context.state.gamesObj)).map((action, i) => {
                                                return <ListItem key={i} title={`${[Object.keys(action)]}s: ${action[Object.keys(action)[0]]} \n`} />
                                            })}
                                            <ToggleSwitch

                                                isOn={isOnPositionStats}
                                                onColor="green"
                                                offColor="red"
                                                label="Change View"
                                                labelStyle={{ color: "black", fontWeight: "900" }}
                                                size="mediuim"
                                                onToggle={isOnPositionStats => {
                                                    setPositionStats(isOnPositionStats);
                                                    onToggle(isOnPositionStats);
                                                }}

                                            />
                                        </ScrollView>
                                        {/* </Text> */}
                                    </Card>
                                </View>
                    }
                   
                    </View>
                }
            </MyContext.Consumer>

        </View >

    )






}

const boxStyles = StyleSheet.create({
    container: {
        color: '#32CD32',
        width: 150,
        borderColor: '#000000',
        borderWidth: 3,
        borderStyle: 'solid'
    }
})

const spinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5
    }

});