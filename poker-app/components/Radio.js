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

    componentDidMount() {
        console.log("Tell me when to Mount!")
        this.setState({
            value: this.props.position
        });
    }

    positionReturn(position) {
        // debugger
        this.props.setPosition(position);
    }


    /**
     *
     * @param {Number} - index of the radio_props that should be active. This is the Overall Current Games Position.
     * @memberof Radio
     */
    updateIndex = (currIndex) => {
        if (currIndex < radio_props.length) {
            this.radioFormClear.updateIsActiveIndex(currIndex); // just pass -1 and your radio button should clear
            this.setState({
                value: currIndex
            })
            this.positionReturn(currIndex);
        } else {
            this.radioFormClear.updateIsActiveIndex(0); // just pass -1 and your radio button should clear
            this.setState({
                value: 0
            })
            this.positionReturn(0);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        // debugger;
       // this.props.shouldPositionIncrement(this.updateIndex)
       if(this.state.value != this.props.position){
           this.updateIndex(this.props.position)   
        
       }
        console.log("Value: ", this.state.value);
        console.log("Prop, LIVEGAME: ", this.props.position);
        
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
                        onPress={(value) => {
                            //this.setState({value: value});
                            //debugger;
                            this.props.setPosition(value)
                            console.log("I GOT PRESSEED!!:", value)
                        }}

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


