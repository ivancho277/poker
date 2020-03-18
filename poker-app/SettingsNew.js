import React, { Component } from 'react';
import { Picker, View, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Platform, Modal, TouchableHighlight } from 'react-native';
// import { Button } from 'react-native-elements';
const storage = require('./components/AsyncStorageController.js');
// import { Container, Header, Content, List, ListItem, Text, Button, Icon, CardItem, Card, Input, Picker, Form, Item, Label, Body } from 'native-base';
// import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { MyContext } from './stateContext/GlobalState'
import { Text, Divider, Subheading, IconButton, List, Checkbox, Button, TextInput, Appbar } from 'react-native-paper';

const editOptions = ["Edit Actions", 'Edit Tags']

export default class NewSettings extends Component {

    constructor() {
        super();
        this.state = {
            action: '',
            tag: '',
            yesorno: false,
            basic: true,
            showEditingActions: false,
            showEditingTags: false,
            tagVal: undefined,
            actionVal: 'actions'
        };
    }



    confirmAlert(title = 'Alert', message = '', onConfirmMessage = '', onConfirmFunction) {

        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => { onConfirmFunction(); alert(onConfirmMessage) } },
            ],
            { cancelable: true },
        );
    }

    onActionChange(value) {
        this.setState({
            actionVal: value
        });
    }


    onTagChange(value) {
        this.setState({
            tagVal: value
        });

    }


    //TODO: need some kind of save button here, also after finishing globalState funtions use them here to update global state state.

    render() {
        return (
            <MyContext.Consumer>
                {(context) =>
                    <View>
                        <View style={{ margin: 4, padding: 4, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }} >
                            <Subheading style={{ backgroundColor: 'lightgrey' }}>Edit Game Actions</Subheading>
                            <View>
                                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                    <TextInput
                                        style={{ width: '100%', position: 'relative' }}
                                        label='add action'
                                        value={this.state.actionVal}
                                        onChangeText={text => this.setState({ actionVal: text })}
                                    />

                                    <IconButton
                                        style={{ position: 'absolute', right: 10, top: 7 }}
                                        icon="plus"
                                        color={'blue'}
                                        size={28}
                                        onPress={() => console.log('Pressed')}
                                    />
                                </View>
                                <Divider style={{ height: 3, backgroundColor: 'yellow' }} />
                                <View style={{ width: '100%', display: 'flex', position: 'relative', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                    <View style={{ width: '100%', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                        <Picker
                                            label='choose action to remove'
                                            selectedValue={this.state.action}
                                            prompt='Please select action to Remove'
                                            style={{ margin: 3, height: 50, width: '60%', }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ action: itemValue })
                                            }>
                                            {context.state.actionStrings.map((action, i) => {
                                                return <Picker.Item label={action} key={action} value={action} />
                                            })}

                                        </Picker>
                                    </View>
                                    <Button style={{ padding: 2, width: '40%', position: 'absolute', right: 0, top: 11 }} color='red' mode='contained' backgroundColor="red" onPress={() => console.log('Pressed')}>
                                        <Text style={{ fontSize: 10 }}>Remove Action </Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={{ margin: 4, padding: 4, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }} >
                            <Subheading style={{ backgroundColor: 'lightgrey' }}>Edit Tags</Subheading>
                            <View>
                                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                    <TextInput
                                        style={{ width: '100%', position: 'relative' }}
                                        label='add tag'
                                        value={this.state.tagVal}
                                        onChangeText={text => this.setState({ tagVal: text })}
                                    />

                                    <IconButton
                                        style={{ position: 'absolute', right: 10, top: 7 }}
                                        icon="plus"
                                        color={'blue'}
                                        size={28}
                                        onPress={() => console.log('Pressed')}
                                    />
                                </View>
                                <Divider style={{ height: 3, backgroundColor: 'yellow' }} />
                                <View style={{ width: '100%', display: 'flex', position: 'relative', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                    <View style={{ width: '100%', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                        <Picker
                                            label='choose tag to remove'
                                            selectedValue={this.state.tag}
                                            prompt='Please select action to Remove'
                                            style={{ margin: 3, height: 50, width: '60%', }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ tag: itemValue })
                                            }>
                                            {context.state.allTags.map((action, i) => {
                                                return <Picker.Item label={action} key={action} value={action} />
                                            })}

                                        </Picker>
                                    </View>
                                    <Button style={{ padding: 2, width: '40%', position: 'absolute', right: 0, top: 11 }} color='red' mode='contained' backgroundColor="red" onPress={() => console.log('Pressed')}>
                                        <Text style={{ fontSize: 10 }}>Remove Action </Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </MyContext.Consumer>
        )
    }
}

const colors = {
    white: "#FFFFFF",
    monza: "#C70039",
    switchEnabled: "#C70039",
    switchDisabled: "#efeff3",
    blueGem: "#27139A",
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {

    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },

    trash: {
        height: 25,
        width: 25,
    },
});

  // <View style={{ width: 200, height: 200, borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            // <View style={styles.container}>
            //     <Text> Settings </Text>
            //     <Button title='Delete all tags' onPress={() =>   this.confirmAlert('Delete all tags', "Are you sure?", 'tags deleted', storage.removeTags)} />
            //     <Button title='Reset Actions' onPress={() => this.confirmAlert('Reset all actions', "Are you sure?", 'actions reset', storage.resetActions)} />
            //     <TouchableOpacity onPress={() => { this.confirmAlert('Delete all storage', "Are you sure?", 'Data deleted', () => {storage.removeData() ; storage.removeCurrentGame(); storage.removeTags()})}}>
            //         <Text style={{ color: 'black',backgroundColor: 'red' , width:50, height: 35 }}>Delete storage</Text>
            //     </TouchableOpacity>
            //     <Button title="test" onPress={() => this.confirmAlert()}></Button>
            // </View>