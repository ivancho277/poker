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

    positionReturn(){
        // debugger
        this.props.getPosition(this.state.value);
    }


    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    buttonSize={10}
                    buttonOuterSize={20}
                    labelHorizontal={false}                   
                    onPress={(value) => {this.setState({ value: value }); setTimeout(() => {
                        this.positionReturn()
                    }, 2000)}}
                />
            </View>
        );
    }
};

export default Radio;


