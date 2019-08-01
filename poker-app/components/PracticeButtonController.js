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
                <Button title="call" />
                <Button title="fold" />
                <Button title="raise" />
            </View>
        );
    }
}
