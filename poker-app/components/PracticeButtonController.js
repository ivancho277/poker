import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
const storageController = require('./AsyncStorageController.js')
export default class PracticeButtonController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calls: 0,
            folds: 0,
            raises: 0,
            tag: "",
            tags: [],
            gamesArray: []
        };
    };

    async populateGames() {
       await  storageController.retrieveData().then((res) => {
            let pastGames = JSON.parse(res);
            console.log("populate function");
            let arrayOfgames = [];
            pastGames.games.forEach(game => {
                arrayOfgames.push(game);
            })
            console.log(res)
            console.log(pastGames)
            if (res.games) {
                this.setState({
                    gamesArray: arrayOfgames
                });
            }
        }).catch((error) => {
            alert("populate error");
            throw error;
        })
    }




componentDidMount() {
    this.populateGames().then(() => {
        console.log("LOOK UNDER");
        console.log(this.state.gamesArray)
    })
}


saveToTags(tag) {
    let tagsArray = this.state.tags;
    tagsArray.push(tag);
    this.setState({
        tags: tagsArray
    })
};



toBeSaved() {
    let date = new Date();
    let gamesObj = {
        calls: this.state.calls,
        folds: this.state.folds,
        raises: this.state.raises,
        tags: this.state.tags
    }
    let gamesarr = this.state.gamesArray;
    console.log("LOOOK")
    console.log(gamesarr)
    gamesarr.push(gamesObj)
    let saveObj = {
        version: "1.0.0",
        date: date.getTime(),
        games: gamesarr
    }
    return saveObj;
};

render() {
    return (
        <View>
            <Text> PracticeButtonController </Text>
            <TextInput
                style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                placeholder="Type your tags here"
                onChangeText={(tag) => this.setState({ tag })}
                value={this.state.tag}
            />
            <Button title="save tag" onPress={() => this.saveToTags(this.state.tag)} />
            <Button title={`call, #${this.state.calls}`} onPress={() => this.setState({ calls: ++this.state.calls })} />
            <Button title={`fold, #${this.state.folds}`} onPress={() => this.setState({ folds: ++this.state.folds })} />
            <Button title={`raise, #${this.state.raises}`} onPress={() => this.setState({ raises: ++this.state.raises })} />
            <Button title='Save Data. End game.' onPress={() => storageController.saveData(this.toBeSaved())} />

        </View>
    );
}
}
