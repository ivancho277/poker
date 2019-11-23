import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, TextInput } from 'react-native';
import PBC from './components/PracticeButtonController';
import LiveStatsBox from './components/LiveStatsBox';
import TagsModal from './components/TagsModal';
import { MyContext } from './stateContext/GlobalState';

const storage = require("./components/AsyncStorageController.js");

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
            selected: ""
        }
    }

    goHome = () => {
        this.props.navigation.navigate('Home');
    }

    retriveCurrentGame = async () => {
        return currentTags = await storage.retrieveCurrentGame().then(res => {
            if(res){
            return JSON.parse(res);
            }
            else return res;     
        })
    }

    componentDidMount() {
        storage.retrieveTags().then(res => {
            let tagsArr = JSON.parse(res);
            if (tagsArr) {
                this.setState({
                    allTags: tagsArr
                })
            }
        })
        this.retriveCurrentGame().then(res => {
            console.log("tag: ", res)
            if(res != null){
                this.setState({tags: res.tags})
            }
        })
    }

    saveToAllTags() {
        if (!this.state.allTags.includes(this.state.tag) && this.state.tag != "") {
            let updatedTags = this.state.allTags.concat(this.state.tag);
            this.setState({
                allTags: updatedTags
            }, () => {
                storage.saveTags(this.state.allTags)
            })
        }
    }


    componentDidUpdate() {
        // console.log("GAME SCREEN"); console.log(this.state.currentGame);
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
            tags: tags
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
                <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.clearTags(); this.saveToAllTags() }} />
            </View>
        )
    }

    showSelectedTag = (selected) => {
        this.setState({
            selected: selected
        })
    }

    render() {
        return (
            <MyContext.Consumer>
            {(context) => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 2, borderColor: 'blue', borderStyle: "solid" }}>
                <LiveStatsBox getGamesObj={context.state.gamesObj} currentGame={this.state.currentGame} tags={this.state.tags} position={this.state.position} logTags={this.logTags} height={100} width={270} />

                {/* <Button title='show modal' onPress={() => { this.setState({ showModal: true }) }} /> */}
                <TagsModal showSelectedTag={this.showSelectedTag} allTags={this.state.allTags} renderTagInput={this.renderTagInput}></TagsModal>
                {/* <Button title="log State" onPress={() => console.log(this.state.position)} /> */}
                <PBC getGames={context.state.gamesArray} updateGames={context.updateGames} tags={this.state.tags} setLiveGamePosition={this.setLiveGamePosition} goHome={this.goHome} setPosition={this.setPosition} />
                <Button title='Go to home screen' onPress={() => this.goHome()} />
                {/* <Button title='Delete all tags' onPress={() => storage.removeTags()} />
                <Button title='Reset Actions' onPress={() => storage.resetActions()} /> */}
            </View>
            }
            </MyContext.Consumer>
            
        )
    }
}

export default GameScreen;