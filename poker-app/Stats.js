import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import * as Calculate from './components/GameCalculations/calculateStats.js'
import * as storage from './components/storageAPI/AsyncStorageController.js';
import Tester from './components/testComponents/Tester';
import { UseGameStore, GameSubscriber } from './DataStore/GameStore';
import { Chip, Snackbar, Card, Surface } from 'react-native-paper';
import { ValidationSnackbar } from './components/DialogsAndSnackbars/ValidationSnackBar';
import { ScrollView } from 'react-native-gesture-handler';
import { DisplaySelectedStats } from './components/functionalComponents/DisplaySelectedStats';
import { Switch } from 'react-native-paper';
import { DisplayStats } from './components/functionalComponents/DisplayStats';
import { DataGraph } from './components/functionalComponents/DataGraph.js';
//import Tester from './components/tester'
// const calculation = require('./components/statscalculation.js')

// const storage = require('./components/AsyncStorageController.js');

class StatsScreen extends Component {

    state = {
        tagpicker: '',
        selectedTags: [],
        showSnack: false,
        lastRemovedTag: '',
        foundGames: []
    }

    _setFoundGames = (found) => { this.setState({ foundGames: found }), () => { console.log("set it it it") } }

    componentDidMount() {
        // console.log(this.context.state.allTags);
    }

    renderChips = (tags, games) => {
        if (tags !== null) {
            if (tags.length > 0) {
                return tags.map(tag => {
                    return <Chip icon="close-circle-outline"  key={tag} value={tag} style={{ paddingHorizontal: 3, marginHorizontal: 3 }} onPress={() => this.onChipPress(tag, games)}>{tag}</Chip>
                })
            } else {
                return <Text style={{ textAlign: 'auto', fontStyle: 'italic', }}>Chosen tags...</Text>
            }
        }
        else {
            return <Chip> We got nothing boss. </Chip>
        }
    }

    renderGamesFound = (tagsArray, games, teston, testswitch_cb) => {
        return (
            <View style={{ maxHeight: 400, marginBottom: 20, paddingBottom: 30 }}>
                <Card>
                    <Card.Title title='Testing Raw Data' subtitle="Game data for selected tags will appear here..." />
                    <ScrollView>
                        <Card.Content>
                            <View style={{ flex: 1 }}>
                                <Text>Toggle to see raw data for testing</Text>
                                <Switch
                                    style={{ alignContent: 'center' }}
                                    value={teston}
                                    onValueChange={testswitch_cb}
                                />
                            </View>
                            <ScrollView>
                                {teston ?
                                    tagsArray.length > 0 ?
                                        <View>
                                            <Text>Total # of actions: {Calculate.sumGamesTotals(Calculate.searchByManyTags(tagsArray, games))}</Text>
                                            <Text>Found Games totals of each action: {JSON.stringify(Calculate.sumUpGameTotals(Calculate.searchByManyTags(tagsArray, games)), undefined, 4)}</Text>
                                            <Text>Games per POS: {JSON.stringify(Calculate.sumGamesPositions(Calculate.searchByManyTags(tagsArray, games)), undefined, 5)}</Text>
                                        </View>
                                        :
                                        <View>
                                            <Text>Select some tags!</Text>
                                            <Text>More data</Text>
                                        </View>
                                    :
                                    <Text style={{ color: 'red' }}>Note: test mode will stay on everywhere</Text>
                                }
                            </ScrollView>
                        </Card.Content>
                    </ScrollView>
                </Card>
            </View>
        )
        // if (this.state.selectedTags.length > 0) {
        //     Calculate.searchByManyTags(tagsArray, games);

        // }
        // else
    }

    renderPicker() {
        return <GameSubscriber>
            {({ data }, actions) =>

                <RNPickerSelect
                    selectedValue={this.state.tagpicker}
                    style={{ height: 40, width: 110, backgroundColor: 'grey', zIndex: -1 }}

                    // prompt={"select tag"}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ tagpicker: itemValue });

                    }}
                    items={data.tags != null ? data.tags.map((tag, i) => { return { label: tag, value: tag } }) : { label: 'No Tags', value: null }}
                >
                    {/* {data.tags.map((tag, i) => {
                        return <RNPickerSelect.Item label={tag} value={tag} key={i} />
                    })} */}
                </RNPickerSelect>}
        </GameSubscriber>
    }

    _hideSnack = () => {
        this.setState({
            showSnack: false
        })
    }

    onSearchPress(tagToSearch, games) {
        //Calculate.searchBytag(tagToSearch, allGameData)
        if (this.state.selectedTags.includes(tagToSearch)) {
            this.setState({
                showSnack: true
            })
        } else {
            let newSelected = this.state.selectedTags.concat(tagToSearch)
            this.setState({
                selectedTags: newSelected,
            }, () => { console.log(this.state.selectedTags) })
            this._setFoundGames(Calculate.searchByManyTags(newSelected, games))
        }
    }
    onChipPress(tagtoremove, games) {
        let updateedTagsArray = this.state.selectedTags.filter(tag => tag !== tagtoremove);
        console.log("pleeeeese tell me this works!", Calculate.searchByManyTags(updateedTagsArray, games));
        this._setFoundGames(Calculate.searchByManyTags(updateedTagsArray, games))
        this.setState({
            selectedTags: updateedTagsArray,
            lastRemovedTag: tagtoremove
        })
    }


    render() {
        return <GameSubscriber>
            {({ data, calculatedData, testModeOn }, actions) =>
                // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
                <ScrollView>
                    <DisplayStats />
                    <View>
                        <Surface>
                            <Card elevation={10}>
                                <Card.Title title='Search by Tags' />
                                <Card.Content>

                                    {this.renderPicker()}
                                    <Button title="add Tag" onPress={() => { this.state.tagpicker === "" || this.state.tagpicker === null ? console.log('Nothing picked') : this.onSearchPress(this.state.tagpicker, data.allGames) }}></Button>
                                    <View>
                                        <Text style={{ alignContent: 'flex-end', textAlign: 'center' }} >Selected tags: Click to unselect</Text>
                                        <View style={{ flex: 0, flexDirection: 'row', borderColor: 'black', borderStyle: 'solid', borderWidth: 2, padding: 15 }}>
                                            {this.renderChips(this.state.selectedTags, data.allGames)}
                                        </View>
                                    </View>
                                </Card.Content>

                            </Card>
                            <View style={{ alignContent: 'space-around', margin: 5 }}>
                                <DisplaySelectedStats foundGames={this.state.foundGames} ></DisplaySelectedStats>
                            </View>
                        </Surface>
                        <View>
                            <View>
                                {this.renderGamesFound(this.state.selectedTags, data.allGames, testModeOn, actions.TestModeSwitch)}
                            </View>
                            {/* <DataGraph /> */}

                            <ValidationSnackbar
                                message={`Sorry, you have already added the tag: ${this.state.lastRemovedTag}`}
                                visible={this.state.showSnack}
                                onDismiss={this._hideSnack}
                            />


                        </View>
                    </View>
                </ScrollView>



            }
        </GameSubscriber>
    }
}

export default StatsScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});