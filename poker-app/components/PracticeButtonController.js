import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class PracticeButtonController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calls: 0,
            folds: 0,
            raises: 0
        };
    }

    render() {
        return (
            <View>
                <Text> PracticeButtonController </Text> 
                <Button title={`call, #${this.state.calls}`} onPress={()=> this.setState({calls: ++this.state.calls})}  /> 
                <Button title={`fold, #${this.state.folds}`} onPress={()=> this.setState({folds: ++this.state.folds})}/> 
                <Button title={`raise, #${this.state.raises}`} onPress={()=>this.setState({raises: ++this.state.raises})}/> 
            </View>
        );
    }
}
