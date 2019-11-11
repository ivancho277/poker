import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

let radio_props = [
    { label: 'BB', value: 0 },
    { label: 'SB', value: 1 },
    { label: 'D', value: 2 },
    { label: 'D+1', value: 3 },
    { label: 'D+2', value: 4 },
    { label: 'D+3', value: 5 },
    { label: 'D+4', value: 6 },
    { label: 'D+5', value: 7 },
    { label: 'D+6', value: 8 }
]

class Radio extends Component {
    constructor(props) {
        super(props);
        state = {
            value: 0
        }

    }
    positionReturn(position) {
        // debugger
        this.props.getPosition(position);
    }


    updateIndex = (index) => {
        if (index < radio_props.length - 1) {
            this.radioFormClear.updateIsActiveIndex(++index); // just pass -1 and your radio button should clear
            this.setState({
                value: index
            })
            this.positionReturn(index);
        } else {
            this.radioFormClear.updateIsActiveIndex(0); // just pass -1 and your radio button should clear
            this.setState({
                value: 0
            })
            this.positionReturn(0);
        }
    }

    componentWillUpdate() {
        this.props.shouldPositionIncrement(this.updateIndex)
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <RadioForm
                        ref={ref => this.radioFormClear = ref}
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        buttonSize={10}
                        buttonOuterSize={20}
                        labelHorizontal={false}
                        onPress={(value) => { this.setState({ value: value }); this.positionReturn(value); }}

                    />
                </View>

                <View>
                    {/* <Button title="test increment" onPress={() => this.updateIndex(this.state.vlaue)} /> */}
                </View>
            </View>
        );
    }
};

export default Radio;


