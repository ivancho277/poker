import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import StatsBox from './components/Statsbox'
import SearchModal from './components/SearchModal'
import { TextInput } from 'react-native-gesture-handler';
import { MyContext } from './stateContext/GlobalState';
import { AntDesign } from '@expo/vector-icons';

const storage = require("./components/AsyncStorageController.js");
const calculation = require('./components/statscalculation.js')

//  const context = useContext(MyContext)



class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gamesObj: {},
            totals: {},
            tagsearch: '',
            openSearchModal: false
        }
    }

    componentDidMount(){

    }

    conextRender = (cb) => {
        cb()
    }

    logTags = (allGames, tag) => {
        console.log('MY TAG', tag)
        if (tag === "") {
            return calculation.findTag(allGames, 'default');
        } else {
            return calculation.findTag(allGames, tag);
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

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <View>
                    {/* <AntDesign name="doubleright" size={32} color="green"> </AntDesign> */}
                    <MyContext.Consumer>
                        {(context) => <Button title="test" onPress={() => {  console.log(calculation.findManyTags(context.state.gamesObj, ["Home", "France"]) )}} />}
                    </MyContext.Consumer>
                    <Text>POKER TRACKER</Text>
                    {/* <SearchModal objToArray={this.objToArray} searchInput={this.renderSearchInput} logTags={this.logTags}></SearchModal> */}
                </View>

                <View>
                    <StatsBox logTotalsByPosition={this.logTotalsByPosition} height={320} width={200}   />
                    <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                    <Text>ReRender global state</Text>

                    <MyContext.Consumer>
                        {(context) => <TouchableOpacity onPress={() => { console.log('AhAHA', context.state); context.remount() }}>
                            <Text>Press me</Text>
                        </TouchableOpacity>}
                    </MyContext.Consumer>
                    <TouchableOpacity onPress={() => { storage.removeData(); storage.removeCurrentGame() }}>
                        <Text style={{ color: 'red' }}>Delete storage</Text>
                    </TouchableOpacity>
                </View >
            </View>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BCD4",
        height: '80%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,

    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});  