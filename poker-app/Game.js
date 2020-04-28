import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, onLongPress } from 'react-native';
import PBC from './components/PracticeButtonController';
import { Button } from 'react-native-elements';
import LiveStatsBox from './components/LiveStatsBox';
import TagsModal from './components/TagsModal';
import { MyContext } from './stateContext/GlobalState';
import ActionButton from 'react-native-action-button';
import { AntDesign } from '@expo/vector-icons';
import { isEmpty } from './components/statscalculation.js'
import * as storage from './components/storageAPI/AsyncStorageController.js';
const gameConstructors = require('./components/gameObjects.js');


const { gameStats, Action } = gameConstructors;
// const storage = require("./components/AsyncStorageController.js");

//import Controller from './components/Controller'
class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            currentGame: {},
            showModal: false,
            tag: '',
            tags: [],
            allTags: [],
            selected: "",
            actionToAdd: '',
            actionInputOpen: false,
            showTagsModal: false,
            activeActionMenu: false
        }
    }

    goHome = () => {
        this.props.navigation.navigate('Home');
    }



    componentDidMount() {
        
        const { allTags, currentGame } = this.context.state
        console.log("MONT", allTags);
    }

    //TODO: Might need to set state from context here, or just update context instead.
    componentDidUpdate() {
        // this.setState({
        //     allTags: this.context.allTags,
        //     tags: this.context.currentGame != null ? JSON.parse(this.context.currentGame.tags) : []
        // })
        console.log("up", this.context.state.allTags);
    }

    setPosition = (position) => {
        //  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO    " , position)
        this.setState({
            position: position
        });
    }

    clearTags = () => {
        this.setState({
            tag: ''
        });
    }

    saveToTags(tag) {
        if (tag == "") {
            let tagsArray = this.state.tags.concat(this.state.selected)
            this.setState({
                tags: tagsArray
            })
        }
        else {
            let tagsArray = this.state.tags.concat(this.state.tag)
            this.setState({
                tags: tagsArray
            })
        }
    };

    renderTagInput = () => {
        return (
            <View>
                <TextInput
                    style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder={this.state.selected}
                    onChangeText={(tag) => this.setState({ tag })}
                    value={this.state.tag}
                />
                {/* <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.clearTags(); this.saveToAllTags() }} /> */}
                <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.context.modifiers.addTag(this.state.tag); this.clearTags(); }} />
            </View>
        )
    }

    renderActionInput = () => {
        return (
            <View style={{ position: "relative", zIndex: -1 }}>
                <TextInput
                    style={{ backgroundColor: "white", height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid', }}
                    placeholder='Add a new game Action'
                    onChangeText={(actionToAdd) => this.setState({ actionToAdd })}
                    value={this.state.actionToAdd}
                />
                {/* <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="add action" onPress={() => { this.state.actionToAdd != "" ? this.context.modifiers.saveActions(this.state.actionToAdd & this.setState({ actionInputOpen: false, actions: this.state.actions.concat(new Action(this.state.actionToAdd)), actionToAdd: '' }) : this.setState({ actionInputOpen: false }) }} /> */}
            </View>
        )
    }

    showSelectedTag = (selected) => {
        this.setState({
            selected: selected
        })
    }

    closeTagModal = () => {
        this.setState({ showTagsModal: false });
    }

    render() {
        let showOtherButtons = false;
        let showButtons = true;
        return (
            <MyContext.Consumer>
                {(context) => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 2, borderColor: 'blue', borderStyle: "solid" }}>
                    <LiveStatsBox gamesObj={context.state.gamesObj} currentGame={context.state.currentGame} currentActions={context.state.currentActions} tags={this.state.tags} logPercentages={context.stats.totalPercentages()} logTotals={context.stats.percentByPosition()}  position={context.state.position} height={100} width={270} />
                    <PBC actionInputOpen={this.state.actionInputOpen} context={this.context} getGames={context.state.gamesArray} currentActions={context.state.currentActions} gamesObj={context.state.gamesObj} updateGames={context.modifiers.updateGames} tags={this.context.state.currentTags} goHome={this.goHome} setPosition={context.modifiers.setPosition}  />

                    {/* TODO: action button should be changes as it is outdated */}

                    <ActionButton onLong style={{ position: 'absolute', zIndex: 1 }} active={this.state.activeActionMenu} autoInactive={false} onPress={() => { showButtons = !showButtons; showOtherButtons = !showOtherButtons }}>
                        <ActionButton.Item active={showButtons} buttonColor='#9b59b6' title="Add Tag" onPress={() => { console.log('open modal'); this.setState({ showTagsModal: true }) }}>
                            <TagsModal closeModal={this.closeTagModal} style={styles.actionButtonIcon} showModal={this.state.showTagsModal} showSelectedTag={this.showSelectedTag} allTags={context.state.allTags} renderTagInput={this.renderTagInput} />
                        </ActionButton.Item>
                        <ActionButton.Item active={showButtons} buttonColor='#3498db' title="Add Action" onPress={() => { this.setState({ activeActionMenu: !this.state.activeActionMenu, actionInputOpen: !this.state.actionInputOpen }); console.log('ACTION: ', this.state.activeActionMenu); }}>
                            <AntDesign name="plus" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item active={showButtons} buttonColor='#228B22' title="Go Home" onPress={() => { this.goHome() }}>
                            <AntDesign name="home" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        {/* Remove buttons */}
                        <ActionButton.Item buttonColor="#DE1062" title="End Current Game" active={showButtons} onPress={() => { this.context.modifiers.deleteCurrentGame(); this.goHome() }}>
                            <AntDesign name='minus' style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor="#9999FF" active={showOtherButtons}>
                            <AntDesign name='edit' style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>




                </View>
                }
            </MyContext.Consumer>

        )
    }
}

export default GameScreen;

GameScreen.contextType = MyContext

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});