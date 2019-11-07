import React, { Component } from "react";
import { Button, Text, View } from "react-native";
//import ScrollPicker from 'react-native-wheel-scroll-picker';
import Modal from "react-native-modal";

export default class TagsModal extends Component {
  state = {
    isModalVisible: false
  };


  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
                <Text>HELLLLO</Text>
 
            <Button title="Hide modal" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}
