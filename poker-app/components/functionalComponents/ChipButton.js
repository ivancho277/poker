import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Text } from 'react-native-paper';


export function ChipButton(props) {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>{alert(`you chose ${props.name}`)}}>
          <Image style={styles.image} source={require("../../assets/noun_PokerChip.png")}/>
        </TouchableOpacity>
    <Text>{props.name}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      width: 3,
      height: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
    backgroundColor: 'green',
      borderRadius: 20,
      padding: 10,
      marginBottom: 5
    },
    image: {
        resizeMode: 'contain'
    }
  });