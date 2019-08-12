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
            gamesArray : []
        };
    } 
    
    saveToTags(tag){
        let tagsArray = this.state.tags;
        tagsArray.push(tag);
        this.setState({
            tags: tagsArray
        })
    }
    
    toBeSaved(){
        let gameObj =  {calls: this.state.calls,
                folds: this.state.folds,
                raises: this.state.raises,
                tags: this.state.tags}
        let arr = this.state.gamesArray;
        arr.push(gameObj);
        return arr; 
    } 

    render() {
        return (
            <View>
                <Text> PracticeButtonController </Text> 
                <TextInput
                    style={{height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid'}}
                    placeholder="Type your tags here"
                    onChangeText={(tag)=> this.setState({tag})}
                    value={this.state.tag}
                />
                <Button title="save tag" onPress={()=> this.saveToTags(this.state.tag)} />
                <Button title={`call, #${this.state.calls}`} onPress={()=> this.setState({calls: ++this.state.calls})}  /> 
                <Button title={`fold, #${this.state.folds}`} onPress={()=> this.setState({folds: ++this.state.folds})}/> 
                <Button title={`raise, #${this.state.raises}`} onPress={()=>this.setState({raises: ++this.state.raises})}/> 
                <Button title='Save Data. End game.' onPress={()=> storageController.saveData(this.toBeSaved())} />  
                
            </View>
        );
    }
}
