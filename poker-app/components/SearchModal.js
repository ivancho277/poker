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
                        {this.props.searchInput()}  
                            <View style={styles.closeButton}>
                              
                                <TouchableHighlight style = {{borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}}
                                    onPress={() => {
                                        this.setState({ modalVisible: !this.state.modalVisible });
                                    }}>
                                    <Text style={styles.text}>Hide Modal</Text>
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

    closeButton:{
        position: 'absolute',
        bottom: 50
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
        position: 'relative'

    },
    text: {
        color: '#3f2949',
        fontSize: 20,
        padding: 20
    }
});  
