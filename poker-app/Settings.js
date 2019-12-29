import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Platform, Modal, TouchableHighlight } from 'react-native';
// import { Button } from 'react-native-elements';
const storage = require('./components/AsyncStorageController.js');
import { Container, Header, Content, List, ListItem, Text, Button, Icon, CardItem, Card, Input, Picker, Form, Item, Label, Body } from 'native-base';
import BottomSheet from './components/BottomSheetList'
// import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { MyContext } from './stateContext/GlobalState'

const editOptions = ["Edit Actions", 'Edit Tags']

export default class SettingsScreen extends Component {

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
      actionVal: undefined
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
      <Container>
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: "center" }} >


          <ScrollView>
            <List>
              <ListItem itemDivider>
                <Text>Edit Action</Text>
              </ListItem>



              <ListItem>
                <Icon active name='hand' />
                <Input onChangeText={(action) =>{this.setState({action}); console.log(action);} } placeholder='add action here' />
              </ListItem>

              <ListItem picker>
                <Label>remove action:</Label>

                <MyContext.Consumer>
                  {(context) =>
                    <Picker
                      prompt="Remove Action"
                      mode="dialog"
                      note={true}
                      placeholder="choose action to remove"
                      iosIcon={<Icon name="arrow-down" />}
                      textStyle={{ color: "#5cb85c" }}
                      itemStyle={{
                        backgroundColor: "#d3d3d3",
                        marginLeft: 0,
                        paddingLeft: 10
                      }}
                      itemTextStyle={{ color: '#788ad2' }}
                      style={{ width: undefined }}
                      selectedValue={this.state.actionVal}
                      onValueChange={this.onActionChange.bind(this)}
                    >
                      {context.state.actions.map((action, i) => {
                        return <Picker.Item label={action} key={i} value={i} />
                      })}
                      {/* <Picker.Item label="actions list" value="placeholder" />
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                  <Picker.Item label="Wallet" value="key5" />
                  <Picker.Item label="ATM Card" value="key6" />
                  <Picker.Item label="Debit Card" value="key7" />
                  <Picker.Item label="Credit Card" value="key8" />
                  <Picker.Item label="Net Banking" value="key9" />
                  <Picker.Item label="Wallet" value="key10" />
                  <Picker.Item label="ATM Card" value="key11" />
                  <Picker.Item label="Debit Card" value="key12" />
                  <Picker.Item label="Credit Card" value="key13" />
                  <Picker.Item label="Net Banking" value="key14" /> */}
                    </Picker>
                  }
                </MyContext.Consumer>
              </ListItem>

              <ListItem itemDivider>
                <Text>Edit Tags</Text>
              </ListItem>




              <ListItem>
                <Icon active name='pricetag' />
                <Input onChangeText={(tag) => {this.setState({tag}); console.log(tag); } }placeholder='add tag here' />
              </ListItem>

              <ListItem>
                <Label>remove tag: </Label>
                <MyContext.Consumer>
                  {(context) =>
                    <Picker
                      prompt="Remove Tag"
                      mode="dialog"
                      note={true}
                      placeholder="choose tag to remove"
                      iosIcon={<Icon name="arrow-down" />}
                      textStyle={{ color: "#5cb85c" }}
                      itemStyle={{
                        backgroundColor: "#d3d3d3",
                        marginLeft: 0,
                        paddingLeft: 10
                      }}
                      itemTextStyle={{ color: '#788ad2' }}
                      selectedValue={this.state.tagVal}
                      onValueChange={this.onTagChange.bind(this)}
                    >
                      {context.state.allTags.map((tag, i) => {
                        return <Picker.Item label={tag} key={i} value={i} />
                      })}
                      {/* <Picker.Item label="list of tags" value="placeholder" />
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                    <Picker.Item label="Wallet" value="key5" />
                    <Picker.Item label="ATM Card" value="key6" />
                    <Picker.Item label="Debit Card" value="key7" />
                    <Picker.Item label="Credit Card" value="key8" />
                    <Picker.Item label="Net Banking" value="key9" />
                    <Picker.Item label="Wallet" value="key10" />
                    <Picker.Item label="ATM Card" value="key11" />
                    <Picker.Item label="Debit Card" value="key12" />
                    <Picker.Item label="Credit Card" value="key13" />
                    <Picker.Item label="Net Banking" value="key14" /> */}
                    </Picker>
                  }

                </MyContext.Consumer>
              </ListItem>
              <ListItem itemDivider>
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
          </ScrollView >
        </Content >
      </Container >
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