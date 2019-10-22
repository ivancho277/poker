import React, { Component } from 'react'
import { Text, View } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

let radio_props = [
    { label: 'Big Blind', value: 0 },
    { label: 'Small Blind', value: 1 },
    { label: 'Dealer', value: 2 },
    { label: 'D+1', value: 3 },
    { label: 'D+2', value: 4 },
    { label: 'D+3', value: 5 },
    { label: 'D+4', value: 6 },
    { label: 'D+5', value: 7 }
]

class Radio extends Component {
    constructor(props) {
        super(props);
            state = {
                value: 0
            }
        
    }
    positionReturn(position){
        // debugger
        this.props.getPosition(position);
        
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <RadioForm
                    //ref = {ref => this.radioFormClear = ref} 
                    radio_props={radio_props}
                    initial={null}
                    formHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={20}
                    labelHorizontal={false}                   
                    onPress={(value) => {this.setState({ value: value }) ;this.positionReturn(value); }}
                />
            </View>
        );
    }
};

export default Radio;


