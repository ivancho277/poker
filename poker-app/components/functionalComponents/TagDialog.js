import React, { useState, useEffect } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';


function RadioTagButtonGroup(props) {
    const [allTags, setAllTags] = useState(props.tagsArr);
    const [value, setValue] = useState('')

    return (
        <RadioButton.Group
            onValueChange={value => setValue(value)}
            value={value}
        >
            {

                
                <RadioButton.Item label={} />


            }

        </RadioButton.Group>
    )

}





export default function TagDialog(props) {
    const [visible, setVisible] = useState(false);
    const [tagtext, setTagText] = useState('');

    const _hideDialog = () => { setVisible(false); }
    const _showDialog = () => { setVisible(true); }
    return (
        <View>
            <AntDesign.Button name='tags' onPress={() => { _showDialog() }}>Add Tag</AntDesign.Button>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={_hideDialog}
                >
                    <Dialog.Title>Select a Tag</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Select tag...'
                            value={tagtext}
                            onChangeText={tagtext => setTagText(tagtext)}
                        />
                    </Dialog.Content>
                    <Dialog.ScrollArea>

                        <RadioTagButtonGroup></RadioTagButtonGroup>

                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                        <Button onPress={() => console.log("Cancel")}>Cancel</Button>
                        <Button onPress={() => console.log("Ok")}>Ok</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
        </View>
    )

}