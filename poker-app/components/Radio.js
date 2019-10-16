import React, { Component } from 'react'
import { Text, View } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

let radio_props = [
    { label: 'Big Blind', position: 0 },
    { label: 'Small Blind', position: 1 },
    { label: 'Dealer', position: 2 },
    { label: 'D+1', position: 3 },
    { label: 'D+2', position: 4 },
    { label: 'D+3', position: 5 },
    { label: 'D+4', position: 6 },
    { label: 'D+5', position: 7 }
]

class Radio extends Component {
    constructor(props) {
        super(props);
            state = {
                position: 0
            }
        
    }


    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <RadioForm
                    radio_props={radio_props}
                    initial={2}
                    formHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={20}
                    labelHorizontal={false}
                    
                    onPress={(position) => this.setState({ position: position })}
                />
            </View>
        );
    }
};

export default Radio;


