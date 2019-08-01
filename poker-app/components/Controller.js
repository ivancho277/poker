import React, { Component } from 'react';
import { View, Text , StyleSheet} from 'react-native';
import Button from './Button'
export default class Controller extends Component {
  state = {

  }

  render() {
    return (
      <View style={styles.container}>
        <Button type="raise" source="raise" />
        <Button type="call" source="call" />
        <Button type="raise" source="raise" />
      </View>
    );
  }
}

const Metrics = {
    containerWidth: width - 30,
    switchWidth: width / 2.7
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.containerWidth,
        height: 55,
        flexDirection: 'row',
        backgroundColor: Colors.mBackColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.mBorderColor,
        borderRadius: 27.5
    }
})