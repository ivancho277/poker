import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform, } from 'react-native';
// import { Button } from 'react-native-elements';
const storage = require('./components/AsyncStorageController.js');
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import BottomSheet from './components/BottomSheetList'

export default class SettingsScreen extends Component {

  constructor() {
    super();
    this.state = {
      action: '',
      tag: '',
      yesorno: false
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

  render() {

    return (
      <Container>
        <Content>
          <List>
            <ListItem itemHeader>
              <Text>Edit Options</Text>
            </ListItem>
            <ListItem>
              <Button hasText transparent onPress={() => { console.log('clicked') }}>
                <Text>Edit Actions</Text>
              </Button>
            </ListItem>
            <ListItem last>
              <Button hasText transparent onPress={() => { console.log('moo') }}>
                <Text>Edit Tags</Text>
              </Button>
            </ListItem>
            <ListItem itemHeader>
              <Text>Delete or Reset</Text>
            </ListItem>
            <ListItem>
              <Button transparent full onPress={() => this.confirmAlert('Reset all actions', "Are you sure?", 'actions reset', storage.resetActions)} >
                <Text>Reset Actions</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button transparent onPress={() => this.confirmAlert('Delete all tags', "Are you sure?", 'tags deleted', storage.removeTags)} >
                <Text>Delete all Tags</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button hasText warning onPress={() => { this.confirmAlert('Delete all storage', "Are you sure?", 'Data deleted', () => { storage.removeData(); storage.removeCurrentGame(); storage.removeTags() }) }} >
                <Text>Delete all Data</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
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

  // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            // <View style={styles.container}>
            //     <Text> Settings </Text>
            //     <Button title='Delete all tags' onPress={() =>   this.confirmAlert('Delete all tags', "Are you sure?", 'tags deleted', storage.removeTags)} />
            //     <Button title='Reset Actions' onPress={() => this.confirmAlert('Reset all actions', "Are you sure?", 'actions reset', storage.resetActions)} />
            //     <TouchableOpacity onPress={() => { this.confirmAlert('Delete all storage', "Are you sure?", 'Data deleted', () => {storage.removeData() ; storage.removeCurrentGame(); storage.removeTags()})}}>
            //         <Text style={{ color: 'black',backgroundColor: 'red' , width:50, height: 35 }}>Delete storage</Text>
            //     </TouchableOpacity>
            //     <Button title="test" onPress={() => this.confirmAlert()}></Button>
            // </View>