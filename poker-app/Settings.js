import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Platform, Modal, TouchableHighlight } from 'react-native';
// import { Button } from 'react-native-elements';
const storage = require('./components/AsyncStorageController.js');
import { Container, Header, Content, List, ListItem, Text, Button, Icon, CardItem, Card, Input, Picker, Form, Item, Label, Body } from 'native-base';
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
      <MyContext.Consumer>
        {(context) =>
          <Container>
            <Content padder contentContainerStyle={{ flex: 1, justifyContent: "center" }} >


              <ScrollView>
                <List>
                  <ListItem itemDivider>
                    <Text>Edit Action</Text>
                  </ListItem>



                  <ListItem>
                    <Icon active name='hand' />
                    <Input onChangeText={(value) => { this.setState({ action: value }); console.log(value); }} placeholder='add action here' value={this.state.action} />
                    <Button onPress={() => { context.modifiers.addAction(this.state.action) & this.setState({ action: '' }) }} >

                      <Icon name='add' />

                    </Button>
                  </ListItem>


                  <ListItem picker>
                  <Button iconLeft warning onPress={() => {context.modifiers.removeAction(this.state.actionVal); console.log('lookie');}}>
                      <Label>Remove: </Label>
                      <Icon type="AntDesign" name='minus' />

                    </Button>



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
                      {context.state.actionStrings.map((action, i) => {
                        return <Picker.Item label={action} key={action} value={action} />
                      })}
                      {/* <Picker.Item label="actions list" value="placeholder" /> */}
                    </Picker>


                  </ListItem>

                  <ListItem itemDivider>
                    <Text>Edit Tags</Text>
                  </ListItem>




                  <ListItem>
                    <Icon active name='pricetag' />
                    <Input onChangeText={(value) => { this.setState({ tag: value }); console.log(value); }} placeholder='add tag here' value={this.state.tag} />
                    <Button onPress={() => { context.modifiers.addTag(this.state.tag) & this.setState({ tag: '' }) }}>
                      <Icon name='add' />
                    </Button>
                  </ListItem>

                  <ListItem>
                    <Button iconLeft warning onPress={() => { context.modifiers.removeTag(this.state.tagVal); console.log('lookie');}}>
                      <Label>Remove: </Label>
                      <Icon type="AntDesign" name='minus' />
                    </Button>

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
                        return <Picker.Item label={tag} key={tag} value={tag} />
                      })}
                      {/* <Picker.Item label="list of tags" value="placeholder" />*/}
                    </Picker>

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