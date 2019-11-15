import React, { Component } from 'react'
import { Text, View, StyleSheet , Button} from 'react-native'

export default class SettingsScreen extends Component {
    render() {
        return (
            // <View  style={{width: 200, height: 200,borderColor: '#000000', borderWidth: 3, borderStyle: 'solid', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text> Settings </Text>
            <Button title="LOOOK" ></Button>
            <Text> Settings </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });