import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Text } from 'react-native-paper';


export function ChipButton(props) {

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => { alert(`you chose ${props.name}`) }}>
                <Image style={styles.image} source={require("../../assets/noun_PokerChip.png")} />
                <Text style={styles.text}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        right: 55,
        top: 55
    },
    button: {
        backgroundColor: 'green',
        height: 130,
        width: 130,
        borderRadius: 90,

    },
    image: {
        resizeMode: 'contain',
        width: 130,
        height: 130
    }
});