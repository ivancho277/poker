import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, colors } from 'react-native-elements';
import StatsBox from './components/Statsbox'
import SearchModal from './components/SearchModal'
import { MyContext } from './stateContext/GlobalState';
import { AntDesign } from '@expo/vector-icons';

import * as storage from './components/storageAPI/AsyncStorageController.js'
import * as calculation from './components/GameCalculations/calculateStats'
import { DisplayStats } from './components/functionalComponents/DisplayStats';
import { Colors, ActivityIndicator } from 'react-native-paper';
import { GameSubscriber } from './DataStore/GameStore';
// import { useGameContext } from './stateContext/useGameContext'
// const storage = require("./components/AsyncStorageController.js");
// const calculation = require('./components/statscalculation.js')

//  const context = useContext(MyContext)



// const HomeScreen = () => {
//     [state, dispatch] = useGameContext();


//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//             <View>
//                 {/* <AntDesign name="doubleright" size={32} color="green"> </AntDesign> */}
//                 <MyContext.Consumer>
//                     {(context) => <Button title="test" onPress={() => { console.log(calculation.findManyTags(context.state.gamesObj, ["Home", "France"])) }} />}
//                 </MyContext.Consumer>
//                 <Text>POKER TRACKER</Text>
//                 {/* <SearchModal objToArray={this.objToArray} searchInput={this.renderSearchInput} logTags={this.logTags}></SearchModal> */}
//             </View>

//             <View>
//                 <View>
//                     <StatsBox logTotalsByPosition={this.logTotalsByPosition} height={290} width={200} />
//                 </View>
//                 <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
//                 <Text>ReRender global state</Text>

//                 <MyContext.Consumer>
//                     {(context) => <TouchableOpacity onPress={() => { console.log('AhAHA', context.state); context.modifiers.remount() }}>
//                         <Text>Press me</Text>
//                     </TouchableOpacity>}
//                 </MyContext.Consumer>

//             </View >
//         </View>
//     )
// }

// export default Home



class HomeScreen extends Component {
    //TODO: get ride of any unsed state data.
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

    componentDidMount() {
        // debugger;
        console.log("MOUNTED: ", this.context.modifiers.getGames())
    }

    componentDidUpdate() {
        console.log(this.context)
    }

    logTags = (allGames, tag) => {
        console.log('MY TAG', tag)
        if (tag === "") {
            return calculation.findTag(allGames, 'default');
        } else {
            return calculation.findTag(allGames, tag);
        }
    }

    //TODO: this might be a utils method to pull out in different file
    objToArray = (obj) => {
        // let values = Object.values(obj);
        let objArray = [];
        for (key in obj) {
            objArray.push({ [key]: obj[key] })
        }
        console.log('OBJECT ARRAY', objArray)
        return objArray
    }

    test = async (cb) => {
        await cb().then(res => { console.log(res) })
    }

    render() {
        return (
            <GameSubscriber>
                {(state, actions) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                        {<View>

                            <Button  title="test press" onPress={() => {console.log(storage.StorageAPI.setTotals(state.data.actions))}}>Press to test</Button>
                    <Text>POKER TRACKER</Text>
                </View>
                }
                        <View>
                            {state.loading ? <ActivityIndicator animating={true} color={Colors.purple800} />
                                :
                                <View>
                                    {/* <StatsBox logTotalsByPosition={this.logTotalsByPosition} height={290} width={200} /> */}
                                    
                                    <DisplayStats></DisplayStats>

                                    <Button title="Game" style={{ margin: '10px' }} onPress={() => this.props.navigation.navigate('Game')} />
                                    <Text>ReRender global state</Text>
                                    <TouchableOpacity onPress={() => { actions.load().then(console.log('LOADED DATA:', state.data)) }}>
                                        <Text style={{ color: Colors.red400 }}>Press me</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                )
                }
            </GameSubscriber>

        )
    }
}

export default HomeScreen;

HomeScreen.contextType = MyContext;

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