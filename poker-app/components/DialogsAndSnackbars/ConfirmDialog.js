import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';


export function ConfirmDialog(props) {
    
    return (
        <View>
            <Portal>
                <Dialog
                    visible={props.isVisible}
                    onDismiss={props.hide}
                >
                    <Dialog.Title>{props.title}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{props.message}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={props.hide}>Okay</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>


    )





}