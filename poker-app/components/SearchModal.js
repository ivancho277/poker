import React, { Component } from 'react'
import { MyContext } from '../stateContext/GlobalState'

import { Text, View, Button, TouchableHighlight, TextInput, StyleSheet, Modal } from 'react-native'

const calculation = require('./statscalculation')


export default class SearchModal extends Component {

    state = {
        modalVisible: false,
        tagsearch: '',
        shouldDisplay: false

    };

    renderFoundGames = (allGames, tag) => {
        let foundgames = this.props.logTags(allGames, tag);
        if (foundgames.length >= 1) {
            return (
                <Text style={{ justifyContent: 'center' }} >
                    Total Stats:{'\n'}
                    {this.props.objToArray(calculation.calculateTotalStats({games: foundgames})).map(action => {
                        return `${[Object.keys(action)]}s: ${action[Object.keys(action)[0]]} \n`
                    })}
                </Text>
            )
        }
        else return <Text>No found Games</Text>

    }
  

    renderSearchInput = () => {
        return (
            <View style={{ position: 'absolute', top: 15 }}>
                <TextInput
                    style={{ height: 40, borderColor: "#000000", borderWidth: 1, borderStyle: 'solid' }}
                    placeholder="Search by tag"
                    onChangeText={(tagsearch) => this.setState({ tagsearch })}
                    value={this.state.tagsearch}
                    style={{ backgroundColor: 'white' }}
                />
                <MyContext.Consumer>
                    {(context) => <Button title="search tags" onPress={() => {this.setState({shouldDisplay: true})} } />}
                </MyContext.Consumer>
            </View>
        )
    }





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
                            {this.renderSearchInput()}
                            <View style={styles.displayBox}>
                                {this.state.shouldDisplay ?
                                <MyContext.Consumer>
                                    {(context) => this.renderFoundGames(context.state.gamesObj, this.state.tagsearch)}
                                </MyContext.Consumer>
                                :
                                <Text>Stats Will Show here.</Text>
                                }
                            </View>
                            <View style={styles.closeButton}>

                                <TouchableHighlight style={{ borderStyle: 'solid', borderWidth: 2, borderColor: 'black' }}
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

    displayBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '80%',
        height: '30%',
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        overflow: "scroll"

    },

    closeButton: {
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
