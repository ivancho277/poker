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
    
    
    toBeSaved(){
        let gameObj =  {calls: this.state.calls,
                folds: this.state.folds,
                raises: this.state.raises}
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
                    onChangeText={(text)=> this.setState({text})}
                    value={this.state.text}
                />
                <Button title={`call, #${this.state.calls}`} onPress={()=> this.setState({calls: ++this.state.calls})}  /> 
                <Button title={`fold, #${this.state.folds}`} onPress={()=> this.setState({folds: ++this.state.folds})}/> 
                <Button title={`raise, #${this.state.raises}`} onPress={()=>this.setState({raises: ++this.state.raises})}/> 
                <Button title='Save Data. End game.' onPress={()=> storageController.saveData(this.toBeSaved())} />  
                
            </View>
        );
    }
}
