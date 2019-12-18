import React from 'react';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import { AntDesign } from '@expo/vector-icons';

import {
    Text,
    Button,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    TextInput
} from 'react-native';

export default class ActionsModal extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3
        };
    }


    render() {
        return (
            <>
                <View style={styles.wrapper}>
                    <Modal
                        isOpen={this.state.isOpen}
                        style={[styles.modal]}
                        position={"bottom"}
                    >

                        <Text style={styles.text}>Modal on bottom with backdrop</Text>
                        <Slider style={{ width: 200 }} value={this.state.sliderValue} onValueChange={(value) => this.setState({ sliderValue: value })} />
                    </Modal>
                </View>
                <View>
                    <AntDesign name="plus" size={20} title="Action" onPress={() => this.setState({ isOpen: true })} />
                </View>
            </>

        )
    }

}

const styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 300,
        width: "95%"
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },

    modal4: {
        height: 300,
        width: "95%"
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});
