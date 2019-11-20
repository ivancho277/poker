import React, { Component } from 'react'
import { MyContext } from '../stateContext/GlobalState'

import { Text, View, Button, TouchableHighlight, TextInput, StyleSheet, Modal } from 'react-native'




export default class SearchModal extends Component {

    state = {
        modalVisible: false,

    };



    render() {
        return (
            <View>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.modal}>
                            <View>
                                {this.props.searchInput()}
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({ modalVisible: !this.state.modalVisible });
                                    }}>
                                    <Text style={{fontSize: 20}}>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View>

                    <Button title="search tags" onPress={() => { this.setState({ modalVisible: !this.state.openSearchModal }); }} style={{ float: 'right' }} />

                </View>

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
