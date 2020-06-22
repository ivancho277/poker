import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';


export function LoadCurrentDialog(props) {

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
                        <Button onPress={() => {props.confirmFunction() ;props.hide()}}>{props.confirmText}</Button>
                        <Button onPress={() => {props.declineFunction() ;props.hide()}}>{props.declineText}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>


    )





}