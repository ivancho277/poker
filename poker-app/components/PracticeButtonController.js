import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const storageController = require('./AsyncStorageController.js')


let radio_props =[
    {label: 'Big Blind', position:0},
    {label: 'Small Blind', position: 1},
    {label: 'Dealer', position: 2},
    {label: 'D+1', position: 3},
    {label: 'D+2', position: 4},
    {label: 'D+3', position: 5},
    {label: 'D+4', position: 6},
    {label: 'D+5', position: 7}
]

export default class PracticeButtonController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calls: 0,
            folds: 0,
            raises: 0,
            tag: "",
            tags: [],
            gamesArray: [],
            position: 0
        };
    };

    async populateGames() {
        await storageController.retrieveData().then((res) => {
            let pastGames = JSON.parse(res);
            console.log("populate function");
            let arrayOfgames = [];
            pastGames.games.forEach(game => {
                arrayOfgames.push(game);
                console.log(game)
            })
            console.log("TAKE A LOOK")
            console.log(arrayOfgames)
            console.log(res)
            console.log(pastGames)
            this.setState({
                gamesArray: arrayOfgames
            });
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
            date: date.toDateString(),
            time: date.getTime(),
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
            version: "1.0.1",
            games: gamesarr
        }
        return saveObj;
    };

    clearTags() {
        this.setState({
            tag: ''
        })
    }

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
                <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => this.saveToTags(this.state.tag) & this.clearTags()} />
                <View style={{ flexDirection: "row" }}>
                    <Button title={`call, #${this.state.calls}`} onPress={() => this.setState({ calls: ++this.state.calls })} />
                    <Button title={`fold, #${this.state.folds}`} onPress={() => this.setState({ folds: ++this.state.folds })} />
                    <Button title={`raise, #${this.state.raises}`} onPress={() => this.setState({ raises: ++this.state.raises })} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <RadioForm 
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    buttonSize={20}
                    buttonOuterSize={30}
                    labelHorizontal={false}
                    onPress={(position) => this.setState({position:position})}
                    />
                </View>
                <Button title='Save Data. End game.' onPress={() => storageController.saveData(this.toBeSaved())} />

            </View>
        );
    }
}
