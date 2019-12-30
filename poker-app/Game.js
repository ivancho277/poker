import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, onLongPress } from 'react-native';
import PBC from './components/PracticeButtonController';
import { Button } from 'react-native-elements';
import LiveStatsBox from './components/LiveStatsBox';
import TagsModal from './components/TagsModal';
import { MyContext } from './stateContext/GlobalState';
import ActionButton from 'react-native-action-button';
import ActionModal from './components/ActionsModal'
import { AntDesign } from '@expo/vector-icons';
import { isEmpty } from './components/statscalculation.js'
import * as storage from './components/AsyncStorageController.js';
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
            actionInputOpen: false,
            showTagsModal: false,
            activeActionMenu: false
        }
    }

    goHome = () => {
        this.props.navigation.navigate('Home');


    }

    retriveCurrentGame = async () => {

        return currentTags = await storage.retrieveCurrentGame().then(res => {
            if (res) {
                return JSON.parse(res);
            }

            else return res;
        })
    }

    componentDidMount() {
        // storage.retrieveTags().then(res => {
        //     let tagsArr = JSON.parse(res);
        //     if (tagsArr) {
        //         this.setState({
        //             allTags: tagsArr
        //         })
        //     }
        // })

        // this.retriveCurrentGame().then(res => {
        //     console.log("tag: ", res)
        //     if (res != null) {
        //         this.setState({ tags: res.tags })
        //     }
        // })
        console.log("MONT", this.context.state.allTags)

        this.setState({
            allTags: this.context.state.allTags,
            tags: isEmpty(this.context.state.currentGame) ? [] : this.context.state.currentGame.tags,
            currentGame: this.context.state.currentGame
        })
    }

    //TODO: Might need to set state from context here, or just update context instead.
    componentDidUpdate() {
        // this.setState({
        //     allTags: this.context.allTags,
        //     tags: this.context.currentGame != null ? JSON.parse(this.context.currentGame.tags) : []
        // })
        console.log("up", this.context.state.allTags)


    }

    setPosition = (position) => {
        //  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO    " , position)
        this.setState({
            position: position
        })
    }

    setLiveGamePosition = (games, tags) => {
        this.setState({
            currentGame: games,
            //tags: tags
        })
    }

    clearTags = () => {
        this.setState({
            tag: ''
        })

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
                    <LiveStatsBox getGamesObj={context.state.gamesObj} currentGame={this.state.currentGame} tags={this.state.tags} position={this.state.position} logTags={this.logTags} height={100} width={270} />
                    {/* <Button title='show modal' onPress={() => { this.setState({ showModal: true }) }} /> */}
                    {/* <TagsModal showSelectedTag={this.showSelectedTag} allTags={this.state.allTags} renderTagInput={this.renderTagInput}></TagsModal> */}
                    {/* <Button title="log State" onPress={() => console.log(this.state.position)} /> */}
                    <PBC actionInputOpen={this.state.actionInputOpen} context={this.context} getGames={context.state.gamesArray} gamesObj={context.state.gamesObj} updateGames={context.modifiers.updateGames} tags={this.state.tags} setLiveGamePosition={this.setLiveGamePosition} goHome={this.goHome} setPosition={this.setPosition} />
                    {/* <Button title='Go to home screen' onPress={() => this.goHome()} /> */}
                    {/* <Button title='Delete all tags' onPress={() => storage.removeTags()} />
                <Button title='Reset Actions' onPress={() => storage.resetActions()} /> */}
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
                        <ActionButton.Item buttonColor="#DE1062" active={showOtherButtons}>
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