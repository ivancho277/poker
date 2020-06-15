import React, { useState, useEffect } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';


function RadioTagButtonGroup(props) {
    const [allTags, setAllTags] = useState(props.alltags);
    const [value, setValue] = useState('');
    const [{ data }, actions] = UseGameStore();

    useEffect(() => {
        return () => {
            console.log('updated tags Dialog', props.alltags)
        }
    }, [data]);

    return (
        <GameSubscriber>
            {({ data }, actions) => (
                <RadioButton.Group
                    onValueChange={value => { setValue(value); props.setTag(value) }}
                    value={value}
                >
                    {

                        data.tags.map((tag, i) => {
                            return <View key={i}>
                                <Text>{tag}</Text>
                                <RadioButton.Item label={tag} value={tag} />
                            </View>
                        })
                    }

                </RadioButton.Group>
            )
            }
        </GameSubscriber>
    )

}





export default function TagDialog(props) {
    const [visible, setVisible] = useState(false);
    const [tagtext, setTagText] = useState('');
    const [alltags, setAllTags] = useState(props.allTags);
    const [, { addTagToCurrentGame, addTagToAll }] = UseGameStore();

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
                    <Dialog.Title>Select a Tag or add a new one.</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Type a new tag...'
                            value={tagtext}
                            onChangeText={tagtext => setTagText(tagtext)}
                        />

                        <Dialog.ScrollArea>

                            <RadioTagButtonGroup setTag={setTagText} alltags={props.alltags} />

                        </Dialog.ScrollArea>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => _hideDialog()}>Cancel</Button>
                        <Button onPress={() => { console.log(tagtext); addTagToCurrentGame(tagtext); addTagToAll(tagtext); setTagText('') }}>Ok</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
        </View>
    )

}