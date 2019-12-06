import React, { Component } from 'react'
import { Text, View, StyleSheet , Button,TouchableOpacity, Alert} from 'react-native'
const storage = require('./components/AsyncStorageController.js')
export default class SettingsScreen extends Component {

    confirmAlert(title='Alert', message='', onConfirmMessage='' ,onConfirmFunction){
        Alert.alert(
            title,
            message,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {onConfirmFunction(); alert(onConfirmMessage)}},
            ],
            {cancelable: true},
          );          
    }

    render() {
        return (
            // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text> Settings </Text>
                <Button title='Delete all tags' onPress={() =>   this.confirmAlert('Delete all tags', "Are you sure?", 'tags deleted', storage.removeTags)} />
                <Button title='Reset Actions' onPress={() => this.confirmAlert('Reset all actions', "Are you sure?", 'actions reset', storage.resetActions)} />
                <TouchableOpacity onPress={() => { this.confirmAlert('Delete all storage', "Are you sure?", 'Data deleted', () => {storage.removeData() ; storage.removeCurrentGame(); storage.removeTags()})}}>
                    <Text style={{ color: 'black',backgroundColor: 'red' , width:50, height: 35 }}>Delete storage</Text>
                </TouchableOpacity>
                <Button title="test" onPress={() => this.confirmAlert()}></Button>
            
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });