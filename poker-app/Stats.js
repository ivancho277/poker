import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { MyContext } from './stateContext/GlobalState'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import * as calculation from './components/statscalculation.js';
import * as storage from './components/AsyncStorageController.js';
import Tester from './components/testComponents/Tester';
import { GameSubscriber } from './DataStore/store'
//import Tester from './components/tester'
// const calculation = require('./components/statscalculation.js')

// const storage = require('./components/AsyncStorageController.js');
export default class StatsScreen extends Component {

    state = {
        tagpicker: ''
    }

    componentDidMount() {
        console.log(this.context.state.allTags);
    }
    renderFoundGames = (allGames, tag) => {
        let foundgames = this.logTags(allGames, tag);
        console.log(this.state.tagpicker);

        console.log(foundgames)
        if (tag != '') {
            if (foundgames.length > 0) {
                return (

                    this.objToArray(calculation.calculateTotalStats({ games: foundgames })).map((action, i) => {
                        return <ListItem title={`${[Object.keys(action)]}s: ${action[Object.keys(action)[0]]}`} key={i} />
                    })


                )
            }
        }

        else return <Text>No found Games</Text>
    }

    logTags = (allGames, tag) => {
        console.log('MY TAG', tag)
        if (allGames != undefined) {
            if (tag === "") {
                return calculation.findTag(allGames, 'default');
            } else {
                return calculation.findTag(allGames, tag);
            }
        }
        else {
            return null;
        }
    }

    objToArray = (obj) => {
        // let values = Object.values(obj);
        let objArray = [];
        for (key in obj) {
            objArray.push({ [key]: obj[key] })
        }
        console.log('OBJECT ARRAY', objArray)
        return objArray
    }



    renderPicker() {
        return (
            <MyContext.Consumer>
                {(context) => <RNPickerSelect
                    selectedValue={this.state.tagpicker}
                    style={{ height: 40, width: 110, backgroundColor: 'grey', zIndex: -1 }}

                    // prompt={"select tag"}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ tagpicker: itemValue });

                    }}
                    items={context.state.allTags != undefined ? context.state.allTags.map((tag, i) => { return { label: tag, value: tag } }) : { label: 'No Tags', value: null }}


                >
                    {/* {context.state.allTags.map((tag, i) => {
                        return <RNPickerSelect.Item label={tag} value={tag} key={i} />
                    })} */}
                </RNPickerSelect>}
            </MyContext.Consumer>

        )
    }

    render() {
        return (
            // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Card title='Search By Tag'
                    containerStyle={{ width: '80%' }}
                >

                    {this.renderPicker()}
                    <MyContext.Consumer>
                        {(context) => this.renderFoundGames(context.state.gamesObj, this.state.tagpicker)}
                    </MyContext.Consumer>
                </Card>

                <Button title="Search By Tag" onPress={() => alert('hi')}></Button>

              
            </View>
        )
    }
}


StatsScreen.contextType = MyContext;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});