import React, { useState, useEffect } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';






export default function ActionDialog(props) {
    const [visible, setVisible] = useState(false);
    const [actiontext, setactiontext] = useState('');
    const [{data}, { addNewAction}] = UseGameStore();
    const [localCurrentTags, setLocalCurrentTags] = useState()
    const _hideDialog = () => { setVisible(false); }
    const _showDialog = () => { setVisible(true); }
   


    useEffect(() => {
        console.log('????', props.isOpen)
    }, [props.isOpen])

    return (
        <View>
            {/* <AntDesign.Button name='tags' onPress={() => { _showDialog() }}>Add Tag</AntDesign.Button> */}
            <Portal>
                <Dialog
                    visible={props.isOpen}
                    onDismiss={props.close}
                >
                    <Dialog.Title>Add a new Action to track...</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Type new Action...'
                            value={actiontext}
                            onChangeText={actiontext => setactiontext(actiontext)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => props.close()}>Back</Button>
                        <Button onPress={() => { console.log(actiontext); addNewAction(actiontext); setactiontext(''); }}>Add</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
        </View>
    )

}