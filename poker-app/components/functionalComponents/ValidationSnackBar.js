import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export function ValidationSnackbar(props) {
    const [isVisible, setisVisible] = useState(false);
    const [message, setMessage] = useState(props.message)
    const [errorText, setErrorText] = useState('');
    const [validText, setValidText] = useState('');

    const _onToggle = () => {setisVisible(!isVisible)}
    const _onDismiss = () => {props.onDismiss()}

    return (
        
            <Snackbar
                visible={props.visible}
                onDismiss={_onDismiss}
                action={{
                    label: "okay",
                    onPress: () => {
                        console.log('what kind of action happens??')
                    },
                }}                    
            >
                {props.message}
            </Snackbar>
        
    )


}


const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
    },
  });