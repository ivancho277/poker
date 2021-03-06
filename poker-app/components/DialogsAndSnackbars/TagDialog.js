import React, { useState, useEffect } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';


function RadioTagButtonGroup(props) {
    const [allTags, setAllTags] = useState();
    const [value, setValue] = useState('');
    const [{ data,  }, actions] = UseGameStore();

    useEffect(() => {
        return () => {
            console.log('updated tags Dialog')
        }
    }, [data,]);

    return (
        <GameSubscriber>
            {({ data, liveGame }, actions) => (
                <RadioButton.Group
                    onValueChange={value => { setValue(value); props.setTag(value) }}
                    value={value}
                >
                    {
                        data.tags.map((tag, i) => {
                            return <View key={i}>
                                <RadioButton.Item label={tag} value={tag} status={liveGame.tags.includes(tag) ? 'checked' : "unchecked"  } />
                            </View>
                        })
                    }
                </RadioButton.Group>
            )
            }
        </GameSubscriber>
    )

}




//TODO: 6/19/2020 --- Having an error 'cannot read property .concat() of undefined when we add anything with add btn
export default function TagDialog(props) {
    const [visible, setVisible] = useState(false);
    const [tagtext, setTagText] = useState('');
    const [savedATag, setSavedATag] = useState(false);
    const [{liveGame}, { addTagToCurrentGame, addTagToAll }] = UseGameStore();
    const _hideDialog = () => { setVisible(false); }
    const _showDialog = () => { setVisible(true); }
    const _savedATag = () => { setSavedATag(true); }
    const _finishedSavingTag = () => { setSavedATag(false); }


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
                    <Dialog.Title>Select a Tag or add a new one.</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Type a new tag...'
                            value={tagtext}
                            onChangeText={tagtext => setTagText(tagtext)}
                        />

                        <Dialog.ScrollArea>

                            <RadioTagButtonGroup setTag={setTagText} savedATag={savedATag} doneSaving={_finishedSavingTag}  />

                        </Dialog.ScrollArea>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => props.close()}>Back</Button>
                        <Button onPress={() => { console.log(tagtext); addTagToCurrentGame(tagtext); addTagToAll(tagtext); setTagText(''); }}>Add</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
        </View>
    )

}