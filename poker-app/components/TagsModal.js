import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import ScrollPicker from "react-native-fen-wheel-scroll-picker";


export default class TagsModal extends Component {
    state = {
        isVisible: false, //state of modal default false  
        tag: ''
    }


    renderTagInput() {
        return (
            <View>
                <TextInput
                    style={{ backgroundColor: 'white', height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Type your tags here"
                    onChangeText={(tag) => this.setState({ tag })}
                    value={this.state.tag}
                />
                <Button style={{ borderColor: "#000000", borderStyle: "solid", borderWidth: 1 }} title="save tag" onPress={() => { this.saveToTags(this.state.tag); this.clearTags(); this.setState({ tagInputOpen: false }) }} />
            </View>
        )
    }

    render() {
        return (

            <View>

                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    {/*All views of Modal*/}
                    <View style={styles.modal}>
                            {this.props.renderTagInput()}
                            <Text style={styles.text}>Select a Tag</Text>
                            <View style={{ height: 200 }}>
                                <ScrollPicker
                                    dataSource={this.props.allTags}
                                    selectedIndex={0}
                                    renderItem={(data, index, isSelected) => {
                                        //
                                    }}
                                    onValueChange={(data, selectedIndex) => {
                                        this.props.showSelectedTag(data)
                                    }}
                                    wrapperHeight={200}
                                    wrapperWidth={150}
                                    wrapperBackground={"#FFFFFF"}
                                    itemHeight={60}
                                    highlightColor={"#d8d8d8"}
                                    highlightBorderWidth={2}
                                    activeItemColor={"#222121"}
                                    itemColor={"#B4B4B4"}
                                />
                            </View>
                        
                        <Button title="Close" onPress={() => {
                            this.setState({ isVisible: !this.state.isVisible })
                        }} />
                    </View>
                </Modal>

                {/*Button will change state to true and view will re-render*/}
                <Button
                    title="Add Tag to Game"
                    onPress={() => { this.setState({ isVisible: true }) }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BCD4",
        height: '80%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,

    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});  