import React, { Component, useState, useEffect } from 'react';
import { Picker, View, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Platform, Modal, TouchableHighlight, ActionSheetIOS } from 'react-native';
// import { Button } from 'react-native-elements';
const storage = require('./components/AsyncStorageController.js');
// import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { MyContext } from './stateContext/GlobalState'
import { Text, Divider, Subheading, IconButton, List, Checkbox, Button, TextInput, Appbar } from 'react-native-paper';
import { GameSubscriber, UseGameStore } from './DataStore/GameStore'

const editOptions = ["Edit Actions", 'Edit Tags']







export default function NewSettings(){
    const [{data, loading} , {load}] = UseGameStore();
    const [action, setAction] = useState('');
    const [tag, setTag] = useState('');
    const [tagVal, setTagVal] = useState('');
    const [actionVal, setActionVal] = useState('');

    useEffect(() => {
        load();
    }, []);

    const confirmAlert = (title = 'Alert', message = '', onConfirmMessage = '', onConfirmFunction) => {
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

  
    return (
        <GameSubscriber>
            {({data, loading}, actions) => (
                <View>
                    <View style={{ margin: 4, padding: 4, borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }} >
                        <Subheading style={{ backgroundColor: 'lightgrey' }}>Edit Game Actions</Subheading>
                        <View>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                <TextInput
                                    style={{ width: '100%', position: 'relative' }}
                                    label='add action'
                                    placeholder='add action...'
                                    value={actionVal}
                                    onChangeText={text => setActionVal(text) }
                                />

                                <IconButton
                                    style={{ position: 'absolute', right: 10, top: 7 }}
                                    icon="plus"
                                    color={'blue'}
                                    size={28}
                                    onPress={() => {console.log('Pressed'); actions.addNewAction(actionVal); setActionVal('')} }   
                                />
                            </View>
                            <Divider style={{ height: 3, backgroundColor: 'yellow' }} />
                            <View style={{ width: '100%', display: 'flex', position: 'relative', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                <View style={{ width: '100%', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                    <Picker
                                        label='choose action to remove'
                                        selectedValue={action}
                                        prompt='Please select action to Remove'
                                        style={{ margin: 3, height: 50, width: '60%', }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            SetAction(itemValue)
                                        }>
                                        {data.actions === null || data.actions === undefined ?  
                                        <Picker.Item label={'no actions'} key={'1'} value={'Loading Actions'} />
                                        :
                                        data.actions.map((action, i) => {
                                            return <Picker.Item label={action} key={action} value={action} />
                                        })}

                                    </Picker>
                                </View>
                                <Button style={{ padding: 2, width: '40%', position: 'absolute', right: 0, top: 11 }} color='red' mode='contained' backgroundColor="red" onPress={() => actions.removeAction(action)}>
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
                                    placeholder='add tag...'
                                    value={tagVal}
                                    onChangeText={text => setTagVal(text) }
                                />

                                <IconButton
                                    style={{ position: 'absolute', right: 10, top: 7 }}
                                    icon="plus"
                                    color={'blue'}
                                    size={28}
                                    onPress={() => {console.log('Pressed'); actions.addTagToAll(tagVal); setTagVal('')} }
                                />
                            </View>
                            <Divider style={{ height: 3, backgroundColor: 'yellow' }} />
                            <View style={{ width: '100%', display: 'flex', position: 'relative', flexDirection: 'row', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                <View style={{ width: '100%', borderWidth: 1, borderColor: 'black', borderStyle: 'solid' }}>
                                    <Picker
                                        label='choose tag to remove'
                                        selectedValue={tag}
                                        prompt='Please select tag to Remove'
                                        style={{ margin: 3, height: 50, width: '60%', }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setTag(itemValue) 
                                        }>
                                        {data.tags === null || data.tags === undefined ?
                                            <Picker.Item label={'no Tags'} key={'0'} value={'noTags'} />
                                            :
                                            data.tags.map((tag, i) => {
                                                return <Picker.Item label={tag} key={tag} value={tag} />
                                            })}

                                    </Picker>
                                </View>
                                <Button style={{ padding: 2, width: '40%', position: 'absolute', right: 0, top: 11 }} color='red' mode='contained' backgroundColor="red" onPress={() => actions.removeTag(tag)   }>
                                    <Text style={{ fontSize: 10 }}>Remove Action </Text>
                                </Button>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Divider />
                        <Button color='teal' onPress={() =>confirmAlert('Delete all tags', "Are you sure?", 'tags deleted', actions.removeAllTags)} mode='contained'>Remove all Tags</Button>
                        <Divider />
                        <Button color='teal' onPress={() =>confirmAlert('Reset all actions', "Are you sure?", 'actions reset', actions.resetActions)} mode='contained'>Reset Actions</Button>
                        <Divider />
                        <Button color='red' onPress={() => {confirmAlert('Delete all storage', "Are you sure?", 'Data deleted', () => { actions.removeAllData(); storage.removeCurrentGame(); actions.removeAllTags() }) }} mode='contained'>DELETE ALL DATA</Button>

                    </View>
                </View>
            )
            }
        </GameSubscriber>
    )
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