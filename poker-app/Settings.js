import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-elements';
const storage = require('./components/AsyncStorageController.js');
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker,
  SettingsButton
} from "react-native-settings-components";


export default class SettingsScreen extends Component {

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white
        }}
      >
        <SettingsCategoryHeader
          title={"Edit Options"}
          textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
        />
        <SettingsDividerLong android={false} />
        <SettingsEditText
          title="Edit Actions"
          dialogDescription={"All Actions"}
          valuePlaceholder="..."
          negativeButtonTitle={"Cancel"}
          buttonRightTitle={"Save"}
          onValueChange={value => {
            console.log("username:", value);
          }}
          value={"Actions"}
        />
        <SettingsDividerShort />
        <SettingsPicker
          title="Edit Tags"
          dialogDescription={"All Tags"}
          options={[
            { label: "...", value: "" },
            { label: "male", value: "male" },
            { label: "female", value: "female" },
            { label: "other", value: "other" }
          ]}
          onValueChange={value => {
            console.log("gender:", value);
          }}
          value={"Tags"}
          styleModalButtonsText={{ color: colors.monza }}
        />
        
        <SettingsSwitch
          title={"Allow Push Notifications"}
          onValueChange={value => {
            console.log("allow push notifications:", value);
          }}
          trackColor={{
            true: colors.switchEnabled,
            false: colors.switchDisabled,
          }}
        />
        
      </ScrollView>
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