import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { FAB, Portal, Provider } from 'react-native-paper';
import TagDialog from './TagDialog';

export default function GameFAB(props) {
    const [open, setOpen] = useState(false);
    const [openAddTag, setOpenAddTag] = useState(false);

    const _openTagDialog = () => setOpenAddTag(true);
    const _closeTagDialog = () => setOpenAddTag(false);

    _onStateChange = () => setOpen(!open);

    return (
        <Provider>
            <Portal>
                <FAB.Group
                    style={styles.fab}
                    open={open}
                    label='Options'
                    icon={open ? 'chevron-down' : 'chevron-up'}
                    actions={[
                        { icon: 'restart', label: 'Discard Game', onPress: () => _openTagDialog() },
                        { icon: 'tag-plus', label: 'Add Tag', onPress: () => { _openTagDialog(); console.log('!!:', openAddTag) } },
                        { icon: 'plus-circle', label: 'Add Action', onPress: () => console.log('Pressed email') },
                        { icon: 'content-save-all', label: 'Save', onPress: () => console.log('Pressed save') },
                    ]}
                    onStateChange={_onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}



                />
               

            </Portal>
            <TagDialog isOpen={openAddTag} open={_openTagDialog} close={_closeTagDialog}></TagDialog>
        </Provider>

    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        color: "black"

    },
})
