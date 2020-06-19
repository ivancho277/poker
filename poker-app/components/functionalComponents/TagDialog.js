import React, { useState, useEffect } from 'react';
import { UseGameStore, GameSubscriber } from '../../DataStore/GameStore'
import { ScrollView, View } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';


function RadioTagButtonGroup(props) {
    const [allTags, setAllTags] = useState(props.alltags);
    const [value, setValue] = useState('');
    const [{ data,  }, actions] = UseGameStore();

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
                                <RadioButton.Item label={tag} value={tag} status={props.currentTags.includes(tag) ? 'checked' : "unchecked"  } />
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
    const [savedATag, setSavedATag] = useState(false);
    const [alltags, setAllTags] = useState(props.allTags);
    const [{liveGame}, { addTagToCurrentGame, addTagToAll }] = UseGameStore();
    const [localCurrentTags, setLocalCurrentTags] = useState(liveGame.tags)

    const _hideDialog = () => { setVisible(false); }
    const _showDialog = () => { setVisible(true); }
    const _savedATag = () => { setSavedATag(true); }
    const _finishedSavingTag = () => { setSavedATag(false); }
    const _addToLocalTags = (tag) => {setLocalCurrentTags(localCurrentTags.concat(tag))}

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

                            <RadioTagButtonGroup setTag={setTagText} alltags={props.alltags} savedATag={savedATag} doneSaving={_finishedSavingTag}  currentTags={localCurrentTags}/>

                        </Dialog.ScrollArea>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => _hideDialog()}>Back</Button>
                        <Button onPress={() => { console.log(tagtext); addTagToCurrentGame(tagtext); addTagToAll(tagtext); _addToLocalTags(tagtext); setTagText(''); }}>Add</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
        </View>
    )

}