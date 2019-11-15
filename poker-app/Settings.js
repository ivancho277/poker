import React, { Component } from 'react'
import { Text, View, StyleSheet , Button,TouchableOpacity, Alert} from 'react-native'
const storage = require('./components/AsyncStorageController.js')
export default class SettingsScreen extends Component {

    confirmAlert(title, onConfirmFunction){
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );          
    }

    render() {
        return (
            // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text> Settings </Text>
                <Button title='Delete all tags' onPress={() => storage.removeTags()} />
                <Button title='Reset Actions' onPress={() => storage.resetActions()} />
                <TouchableOpacity onPress={() => {storage.removeData(); storage.removeCurrentGame()}}>
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