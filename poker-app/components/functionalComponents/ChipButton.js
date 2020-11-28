import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Text, IconButton, Colors } from 'react-native-paper';


//TODO: 6.22.2020 get this Chip button Functional and looking good for use as in game action buttons!
export function ChipButton(props) {

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', alignItems: 'center' }}>
            {/* <TouchableOpacity style={styles.button} onPress={() => { props.onPress() ;console.log(`pressed ${props.title}`) }}> */}
            {/* <Image style={styles.image} source={require("../../assets/Wider_PokerChip.png")} /> */}
            <IconButton
                icon={require("../../assets/Wider_PokerChip.png")}
                color={Colors.lightBlue300}
                size={40}
                onPress={() => props.onPress()}
            />
            <Text style={styles.text}>{props.title}</Text>


            {/* </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        fontSize: 10,
        position: 'absolute',
        top: 10
    },
    button: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        flex: 1,
        backgroundColor: 'transparent',
        //height: 80,
        // width: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        resizeMode: 'contain',
        width: 90,
        height: 90,
    }
});