import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button, ImageBackground } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { MyContext } from '../stateContext/GlobalState';
import Divider from "react-native-divider";
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
        for(key in obj){
            objArray.push({[key] : obj[key]})
        }
        console.log('OBJECT ARRAY', objArray)
        return objArray
    } 


    return (
        <View style={{ height: props.height, color: '#32CD32', width: props.width, borderColor: '#000000', borderWidth: 3, borderStyle: 'solid' }}>

            <MyContext.Consumer>
                {(context) => <ImageBackground style={{ flex: 1, height: '100%', width: '100%' }} source={cardImg}>
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
                                <Text>
                                    Stats by position: {'\n'} 
                                    {calculation.getPercentages(context.state.gamesObj).map(action => { 
                                        return `${[Object.keys(action)]}s: ${action[Object.keys(action)[0]]}% \n`;
                                    })}
                    
                                </Text>
                                :
                                <Text style={{ justifyContent: 'center' }} >
                                    Total Stats:{'\n'}
                                    {objToArray(calculation.calculateTotalStats(context.state.gamesObj)).map(action => {
                                        return `${[Object.keys(action)]}s: ${action[Object.keys(action)[0]]} \n`
                                    })}
                </Text>
                    }
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
                </ ImageBackground>
                }
            </MyContext.Consumer>

        </View>

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